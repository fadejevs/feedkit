import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { resolveMediaDirectUrl } from '@/lib/mediaResolvers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Paragraph = { start: number; end: number; text: string }

function toSrt(paragraphs: Paragraph[]): string {
  return paragraphs
    .map((p, i) => `${i + 1}\n${formatSrtTime(p.start)} --> ${formatSrtTime(p.end)}\n${p.text}\n`)
    .join('\n')
}

function formatSrtTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const ms = Math.floor((seconds - Math.floor(seconds)) * 1000)
  const hh = String(hrs).padStart(2, '0')
  const mm = String(mins).padStart(2, '0')
  const ss = String(secs).padStart(2, '0')
  const mmm = String(ms).padStart(3, '0')
  return `${hh}:${mm}:${ss},${mmm}`
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Server missing OPENAI_API_KEY' }, { status: 500 })
  }
  const openai = new OpenAI({ apiKey })

  const body = await req.json().catch(() => ({} as any))
  const url = body?.url as string | undefined
  const sourceLanguage = (body?.sourceLanguage as string | undefined) || 'auto'
  const targetLanguage = (body?.targetLanguage as string | undefined) || 'original'

  if (!url) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 })
  }

  // Resolve social URLs (Instagram, etc.) to a direct media URL if possible
  let resolvedUrl: string | null = null
  let resolvedContentType: string | undefined = undefined
  
  const resolved = await resolveMediaDirectUrl(url)
  if (resolved) {
    resolvedUrl = resolved
    // contentType will be determined from the response headers
  }
  
  if (!resolvedUrl) {
    // Try external extractor service if configured
    const extractor = process.env.EXTRACTOR_URL
    if (extractor) {
      try {
        const extRes = await fetch(`${extractor}/extract?url=${encodeURIComponent(url)}`)
        if (extRes.ok) {
          const data = await extRes.json()
          resolvedUrl = data.directUrl || null
          resolvedContentType = data.contentType || undefined
        }
      } catch (e) {
        console.error('Extractor service error:', e)
      }
    }
    if (!resolvedUrl) {
      return NextResponse.json({ error: 'Could not resolve media URL' }, { status: 400 })
    }
  }

  // Fetch remote media. This will only work for publicly accessible direct media URLs.
  const res = await fetch(resolvedUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': url,
    },
    redirect: 'follow',
  })
  if (!res.ok) {
    return NextResponse.json({ error: `Failed to fetch media: HTTP ${res.status}` }, { status: 400 })
  }
  const contentType = resolvedContentType || res.headers.get('content-type') || 'application/octet-stream'
  const arrayBuf = await res.arrayBuffer()
  const buffer = Buffer.from(arrayBuf)

  // Determine a supported mime type for Whisper
  const supported = new Set(['audio/flac','audio/m4a','audio/mp3','audio/mpeg','audio/mpga','audio/ogg','audio/oga','audio/wav','audio/webm','video/mp4','video/mpeg','video/webm'])
  const guessedByExt = guessMimeFromUrl(resolvedUrl)
  const finalType = supported.has(contentType) ? contentType : (supported.has(guessedByExt) ? guessedByExt : '')
  if (!finalType) {
    return NextResponse.json({ error: `Unsupported media type: ${contentType}. URL: ${resolvedUrl}` }, { status: 400 })
  }

  // Transcribe via Whisper
  const fileName = makeFileNameFromUrl(resolvedUrl)
  const file = new File([buffer], fileName, { type: finalType })
  const whisperReq: any = {
    file,
    model: 'whisper-1',
    response_format: 'verbose_json',
    timestamp_granularities: ['segment'],
  }
  if (sourceLanguage && sourceLanguage !== 'auto') whisperReq.language = sourceLanguage

  const transcription = await openai.audio.transcriptions.create(whisperReq) as any
  type Segment = { start: number; end: number; text: string }
  const segments: Segment[] = ((transcription as any).segments || []).map((s: any) => ({
    start: s.start,
    end: s.end,
    text: (s.text || '').trim(),
  }))

  const paragraphs: Paragraph[] = []
  let bucket: Segment[] = []
  let bucketDur = 0
  for (const seg of segments) {
    bucket.push(seg)
    bucketDur += seg.end - seg.start
    if (bucketDur >= 10) {
      paragraphs.push({
        start: bucket[0].start,
        end: bucket[bucket.length - 1].end,
        text: bucket.map((b) => b.text).join(' ').replace(/\s+/g, ' ').trim(),
      })
      bucket = []
      bucketDur = 0
    }
  }
  if (bucket.length) {
    paragraphs.push({
      start: bucket[0].start,
      end: bucket[bucket.length - 1].end,
      text: bucket.map((b) => b.text).join(' ').replace(/\s+/g, ' ').trim(),
    })
  }

  // Optional translation per paragraph
  let finalParagraphs: Paragraph[] = paragraphs
  if (targetLanguage && targetLanguage !== 'original') {
    const translated: Paragraph[] = []
    for (const p of paragraphs) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: `Translate the user provided text to ${targetLanguage}. Return only the translated text, no quotes.` },
          { role: 'user', content: p.text },
        ],
        temperature: 0.2,
      })
      const t = completion.choices[0]?.message?.content || p.text
      translated.push({ ...p, text: t.trim() })
    }
    finalParagraphs = translated
  }

  const summary = finalParagraphs.slice(0, 2).map((p) => p.text).join(' ')

  return NextResponse.json({
    paragraphs: finalParagraphs,
    srt: toSrt(finalParagraphs),
    summary,
    sourceLanguage: sourceLanguage === 'auto' ? (transcription as any).language : sourceLanguage,
    targetLanguage,
  })
}

function guessMimeFromUrl(u: string): string {
  try {
    const ext = new URL(u).pathname.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'mp4': return 'video/mp4'
      case 'mp3': return 'audio/mp3'
      case 'wav': return 'audio/wav'
      case 'm4a': return 'audio/m4a'
      case 'webm': return 'video/webm'
      case 'ogg': return 'audio/ogg'
      case 'oga': return 'audio/oga'
      case 'mpeg': return 'video/mpeg'
      case 'mpga': return 'audio/mpga'
      case 'flac': return 'audio/flac'
      default: return ''
    }
  } catch {
    return ''
  }
}

function makeFileNameFromUrl(u: string): string {
  try {
    const path = new URL(u).pathname
    const base = path.split('/').pop() || 'remote'
    return base
  } catch {
    return 'remote'
  }
}


