import { execFileSync } from 'child_process'
export async function resolveMediaDirectUrl(inputUrl: string): Promise<string | null> {
  try {
    const u = new URL(inputUrl)
    // If already a direct media link (mp4/mp3/wav/m4a), return as-is
    if (/\.(mp4|mp3|wav|m4a)(\?.*)?$/i.test(u.pathname)) return inputUrl

    if (u.hostname.includes('instagram.com')) {
      const resolved = await resolveInstagram(inputUrl)
      if (resolved) return resolved
    }

    // Try yt-dlp if available on system (supports Instagram/TikTok/YouTube/etc.)
    const viaYt = resolveViaYtDlpSafe(inputUrl)
    if (viaYt) return viaYt

    // Unknown platform; return as-is and let fetch attempt it
    return inputUrl
  } catch {
    return null
  }
}

async function resolveInstagram(pageUrl: string): Promise<string | null> {
  // Try primary fetch
  const htmlPrimary = await fetchHtml(pageUrl)
  let direct = extractInstagramVideo(htmlPrimary)
  if (direct) return direct

  // Try Jina reader mirrors (helps when IG blocks bot UAs)
  const mirrors = [
    `https://r.jina.ai/http://${new URL(pageUrl).hostname}${new URL(pageUrl).pathname}`,
    `https://r.jina.ai/https://${new URL(pageUrl).hostname}${new URL(pageUrl).pathname}`,
    `https://r.jina.ai/${pageUrl}`,
  ]
  for (const m of mirrors) {
    const html = await fetchHtml(m)
    direct = extractInstagramVideo(html)
    if (direct) return direct
  }
  return null
}

function matchMetaContent(html: string, property: string): string | null {
  const re = new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i')
  const m = re.exec(html)
  return m ? m[1] : null
}

async function fetchHtml(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
    })
    if (!res.ok) return ''
    return await res.text()
  } catch {
    return ''
  }
}

function extractInstagramVideo(html: string): string | null {
  if (!html) return null
  const ogVideo =
    matchMetaContent(html, 'og:video') ||
    matchMetaContent(html, 'og:video:secure_url')
  if (ogVideo && ogVideo.startsWith('http')) return sanitizeUrl(ogVideo)

  const jsonVideo = /"video_url"\s*:\s*"(https:[^\"]+\.mp4)"/i.exec(html)?.[1]
  if (jsonVideo) return sanitizeUrl(jsonVideo)
  return null
}

function sanitizeUrl(u: string): string {
  return u.replace(/\\u0026/g, '&')
}

function resolveViaYtDlpSafe(url: string): string | null {
  try {
    // Check if yt-dlp is available
    const which = execFileSync('bash', ['-lc', 'command -v yt-dlp || command -v youtube-dl'], { encoding: 'utf8' }).trim()
    if (!which) return null
    // Get the best direct URL (-g prints direct media URL)
    const out = execFileSync(which, ['-g', '-f', 'bestaudio*+bestvideo*/best', url], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 })
    const firstLine = out.split(/\r?\n/).find(Boolean)
    if (firstLine && firstLine.startsWith('http')) return firstLine
    return null
  } catch {
    return null
  }
}


