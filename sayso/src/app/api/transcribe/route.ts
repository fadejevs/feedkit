import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function toSrt(paragraphs: { start: number; end: number; text: string }[]): string {
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
  const form = await req.formData()
  const file = form.get('file') as File | null
  if (!file) {
    return NextResponse.json({ error: 'No file' }, { status: 400 })
  }

  // If OpenAI key is present, call Whisper. Else, return a mock so UI works.
  const apiKey = process.env.OPENAI_API_KEY
  console.log('API Key present:', !!apiKey, 'Key starts with:', apiKey?.substring(0, 10))
  if (!apiKey) {
    const text = 'This is a mock transcript paragraph for Sayso. Replace with real API key to transcribe.'
    const paragraphs = [
      { start: 0, end: 4.2, text },
      { start: 4.2, end: 8.9, text: text + ' Second segment.' },
    ]
    return NextResponse.json({
      paragraphs,
      srt: toSrt(paragraphs),
      summary: 'A short summary of the mock audio content.',
    })
  }

  const openai = new OpenAI({ apiKey })

  const arrayBuf = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuf)

  // Whisper transcription
  const transcription = await openai.audio.transcriptions.create({
    file: new File([buffer], file.name, { type: file.type || 'audio/mpeg' }),
    model: 'whisper-1',
    response_format: 'verbose_json',
    timestamp_granularities: ['segment'],
  } as any)

  type Segment = { start: number; end: number; text: string }
  const segments: Segment[] = (transcription.segments || []).map((s: any) => ({
    start: s.start,
    end: s.end,
    text: (s.text || '').trim(),
  }))

  // Merge segments into paragraphs ~10s chunks
  const paragraphs: Segment[] = []
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

  // Simple heuristic summary (first two paragraphs)
  const summary = paragraphs.slice(0, 2).map((p) => p.text).join(' ')

  return NextResponse.json({
    paragraphs,
    srt: toSrt(paragraphs),
    summary,
  })
}


