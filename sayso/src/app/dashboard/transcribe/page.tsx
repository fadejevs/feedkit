"use client"
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UpsellModal } from '@/components/UpsellModal'
import { useUpsell } from '@/hooks/useUpsell'
import { UpsellBanner } from '@/components/UpsellBanner'
import { repoSaveTranscript } from '@/lib/transcriptRepository'

type TranscriptWord = { start: number; end: number; text: string }
type TranscriptParagraph = { start: number; end: number; text: string }


export default function TranscribePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'link' | 'file'>('link')
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState<string>("")
  const [sourceLang, setSourceLang] = useState<string>('auto')
  const [targetLang, setTargetLang] = useState<string>('en')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paragraphs, setParagraphs] = useState<TranscriptParagraph[]>([])
  const [srt, setSrt] = useState<string>("")
  const [summary, setSummary] = useState<string>("")
  const [dragActive, setDragActive] = useState(false)
  const [upsellOpen, setUpsellOpen] = useState(false)
  const { isAuthed, triesLeft, variant, canTryMore, recordTry } = useUpsell()

  const canTranscribe = useMemo(() => (!!file || !!url) && !loading, [file, url, loading])

  async function pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setUrl(text.trim())
        setFile(null)
      }
    } catch {
      // no-op if permissions not granted
    }
  }

  async function handleTranscribe() {
    if (!file && !url) return
    // Gate: allow 2 tries for guests, then upsell
    if (!canTryMore()) {
      setUpsellOpen(true)
      return
    }
    setLoading(true)
    setError(null)
    setParagraphs([])
    setSrt("")
    setSummary("")
    try {
      let res: Response
      if (url) {
        res = await fetch('/api/transcribe/url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, sourceLanguage: sourceLang, targetLanguage: targetLang }),
        })
      } else {
        const form = new FormData()
        form.append('file', file as File)
        res = await fetch('/api/transcribe', { method: 'POST', body: form })
      }
      if (!res.ok) {
        let serverMsg = ''
        try {
          const j = await res.json()
          serverMsg = j?.error || ''
        } catch {}
        throw new Error(serverMsg || `HTTP ${res.status}`)
      }
      const data = await res.json()
      setParagraphs(data.paragraphs || [])
      setSrt(data.srt || '')
      setSummary(data.summary || '')
      
      // Save transcript (Supabase if authed, else localStorage)
      const duration = data.paragraphs?.length > 0 
        ? data.paragraphs[data.paragraphs.length - 1].end 
        : 0
      
      const title = url 
        ? new URL(url).hostname.replace('www.', '') + ' video'
        : file?.name || 'Untitled'
      
      const user = typeof window !== 'undefined' && localStorage.getItem('sayso_auth') ? { id: 'local-user' } : null
      const saved = await repoSaveTranscript(user?.id ?? null, {
        title,
        url: url || undefined,
        sourceLanguage: data.sourceLanguage || sourceLang,
        targetLanguage: targetLang !== 'original' ? targetLang : undefined,
        content: JSON.stringify({ paragraphs: data.paragraphs || [], summary: data.summary || '' }),
        duration,
      })
    } catch (e: any) {
      setError(e?.message || 'Failed to transcribe')
    } finally {
      setLoading(false)
      recordTry()
    }
  }

  function downloadSrt() {
    if (!srt) return
    const blob = new Blob([srt], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sayso.srt'
    a.click()
    URL.revokeObjectURL(url)
  }

  function copyMarkdown() {
    const md = `# Summary\n\n${summary}\n\n## Transcript\n\n${paragraphs.map(p => `- [${formatTime(p.start)} → ${formatTime(p.end)}] ${p.text}`).join("\n")}`
    navigator.clipboard.writeText(md)
  }

  function handleDrag(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Navigation */}
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Transcribe & Translate Videos</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Transform your social media videos into accurate transcripts and captions with AI. 
            Support for 120+ languages and all major platforms. Start for free.
          </p>
        </div>

        {/* Main Upload Card */}
        {!paragraphs.length && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-lg overflow-hidden">
              {/* Tabs */}
              <div className="flex justify-center py-6 bg-neutral-50 border-b border-neutral-200">
                <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white border border-neutral-200 shadow-sm">
                  <button
                    onClick={() => {
                      setActiveTab('link')
                      setFile(null)
                    }}
                    className={`px-6 py-3 text-sm rounded-lg font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      activeTab === 'link'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                    role="tab"
                    aria-selected={activeTab === 'link'}
                    aria-controls="tab-panel-link"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Paste link
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('file')
                      setUrl('')
                    }}
                    className={`px-6 py-3 text-sm rounded-lg font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      activeTab === 'file'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                    role="tab"
                    aria-selected={activeTab === 'file'}
                    aria-controls="tab-panel-file"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      File upload
                    </span>
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-12">
                {activeTab === 'link' ? (
                  <div id="tab-panel-link" role="tabpanel" aria-labelledby="tab-link">
                    <div className="mb-8">
                      <input
                        type="text"
                        placeholder="https://www.instagram.com/p/..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        aria-label="Video URL"
                        className="w-full px-6 py-4 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-base"
                      />
                      <p className="text-sm text-neutral-500 mt-3 text-center">Supports Instagram, TikTok, YouTube, Facebook, X, Vimeo and more.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="source-language" className="block text-sm font-medium text-neutral-700 mb-3">
                          Source Language
                        </label>
                        <select
                          id="source-language"
                          value={sourceLang}
                          onChange={(e) => setSourceLang(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        >
                          <option value="auto">🔍 Auto-detect</option>
                          <option value="af">🇿🇦 Afrikaans</option>
                          <option value="am">🇪🇹 Amharic</option>
                          <option value="ar">🇸🇦 Arabic</option>
                          <option value="as">🇮🇳 Assamese</option>
                          <option value="az">🇦🇿 Azerbaijani</option>
                          <option value="ba">🇷🇺 Bashkir</option>
                          <option value="be">🇧🇾 Belarusian</option>
                          <option value="bg">🇧🇬 Bulgarian</option>
                          <option value="bn">🇧🇩 Bengali</option>
                          <option value="bo">🇨🇳 Tibetan</option>
                          <option value="br">🇫🇷 Breton</option>
                          <option value="bs">🇧🇦 Bosnian</option>
                          <option value="ca">🇪🇸 Catalan</option>
                          <option value="cs">🇨🇿 Czech</option>
                          <option value="cy">🇬🇧 Welsh</option>
                          <option value="da">🇩🇰 Danish</option>
                          <option value="de">🇩🇪 German</option>
                          <option value="el">🇬🇷 Greek</option>
                          <option value="en">🇺🇸 English</option>
                          <option value="es">🇪🇸 Spanish</option>
                          <option value="et">🇪🇪 Estonian</option>
                          <option value="eu">🇪🇸 Basque</option>
                          <option value="fa">🇮🇷 Persian</option>
                          <option value="fi">🇫🇮 Finnish</option>
                          <option value="fo">🇫🇴 Faroese</option>
                          <option value="fr">🇫🇷 French</option>
                          <option value="gl">🇪🇸 Galician</option>
                          <option value="gu">🇮🇳 Gujarati</option>
                          <option value="ha">🇳🇬 Hausa</option>
                          <option value="haw">🇺🇸 Hawaiian</option>
                          <option value="he">🇮🇱 Hebrew</option>
                          <option value="hi">🇮🇳 Hindi</option>
                          <option value="hr">🇭🇷 Croatian</option>
                          <option value="ht">🇭🇹 Haitian Creole</option>
                          <option value="hu">🇭🇺 Hungarian</option>
                          <option value="hy">🇦🇲 Armenian</option>
                          <option value="id">🇮🇩 Indonesian</option>
                          <option value="is">🇮🇸 Icelandic</option>
                          <option value="it">🇮🇹 Italian</option>
                          <option value="ja">🇯🇵 Japanese</option>
                          <option value="jw">🇮🇩 Javanese</option>
                          <option value="ka">🇬🇪 Georgian</option>
                          <option value="kk">🇰🇿 Kazakh</option>
                          <option value="km">🇰🇭 Khmer</option>
                          <option value="kn">🇮🇳 Kannada</option>
                          <option value="ko">🇰🇷 Korean</option>
                          <option value="la">🏛️ Latin</option>
                          <option value="lb">🇱🇺 Luxembourgish</option>
                          <option value="ln">🇨🇩 Lingala</option>
                          <option value="lo">🇱🇦 Lao</option>
                          <option value="lt">🇱🇹 Lithuanian</option>
                          <option value="lv">🇱🇻 Latvian</option>
                          <option value="mg">🇲🇬 Malagasy</option>
                          <option value="mi">🇳🇿 Maori</option>
                          <option value="mk">🇲🇰 Macedonian</option>
                          <option value="ml">🇮🇳 Malayalam</option>
                          <option value="mn">🇲🇳 Mongolian</option>
                          <option value="mr">🇮🇳 Marathi</option>
                          <option value="ms">🇲🇾 Malay</option>
                          <option value="mt">🇲🇹 Maltese</option>
                          <option value="my">🇲🇲 Myanmar</option>
                          <option value="ne">🇳🇵 Nepali</option>
                          <option value="nl">🇳🇱 Dutch</option>
                          <option value="nn">🇳🇴 Norwegian Nynorsk</option>
                          <option value="no">🇳🇴 Norwegian</option>
                          <option value="oc">🇫🇷 Occitan</option>
                          <option value="pa">🇮🇳 Punjabi</option>
                          <option value="pl">🇵🇱 Polish</option>
                          <option value="ps">🇦🇫 Pashto</option>
                          <option value="pt">🇵🇹 Portuguese</option>
                          <option value="ro">🇷🇴 Romanian</option>
                          <option value="ru">🇷🇺 Russian</option>
                          <option value="sa">🇮🇳 Sanskrit</option>
                          <option value="sd">🇵🇰 Sindhi</option>
                          <option value="si">🇱🇰 Sinhala</option>
                          <option value="sk">🇸🇰 Slovak</option>
                          <option value="sl">🇸🇮 Slovenian</option>
                          <option value="sn">🇿🇼 Shona</option>
                          <option value="so">🇸🇴 Somali</option>
                          <option value="sq">🇦🇱 Albanian</option>
                          <option value="sr">🇷🇸 Serbian</option>
                          <option value="su">🇮🇩 Sundanese</option>
                          <option value="sv">🇸🇪 Swedish</option>
                          <option value="sw">🇹🇿 Swahili</option>
                          <option value="ta">🇮🇳 Tamil</option>
                          <option value="te">🇮🇳 Telugu</option>
                          <option value="tg">🇹🇯 Tajik</option>
                          <option value="th">🇹🇭 Thai</option>
                          <option value="tk">🇹🇲 Turkmen</option>
                          <option value="tl">🇵🇭 Tagalog</option>
                          <option value="tr">🇹🇷 Turkish</option>
                          <option value="tt">🇷🇺 Tatar</option>
                          <option value="uk">🇺🇦 Ukrainian</option>
                          <option value="ur">🇵🇰 Urdu</option>
                          <option value="uz">🇺🇿 Uzbek</option>
                          <option value="vi">🇻🇳 Vietnamese</option>
                          <option value="yi">🇮🇱 Yiddish</option>
                          <option value="yo">🇳🇬 Yoruba</option>
                          <option value="zh">🇨🇳 Chinese</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="target-language" className="block text-sm font-medium text-neutral-700 mb-3">
                          Translate To (Optional)
                        </label>
                        <select
                          id="target-language"
                          value={targetLang}
                          onChange={(e) => setTargetLang(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        >
                          <option value="original">🚫 No translation</option>
                          <option value="af">🇿🇦 Afrikaans</option>
                          <option value="am">🇪🇹 Amharic</option>
                          <option value="ar">🇸🇦 Arabic</option>
                          <option value="as">🇮🇳 Assamese</option>
                          <option value="az">🇦🇿 Azerbaijani</option>
                          <option value="ba">🇷🇺 Bashkir</option>
                          <option value="be">🇧🇾 Belarusian</option>
                          <option value="bg">🇧🇬 Bulgarian</option>
                          <option value="bn">🇧🇩 Bengali</option>
                          <option value="bo">🇨🇳 Tibetan</option>
                          <option value="br">🇫🇷 Breton</option>
                          <option value="bs">🇧🇦 Bosnian</option>
                          <option value="ca">🇪🇸 Catalan</option>
                          <option value="cs">🇨🇿 Czech</option>
                          <option value="cy">🇬🇧 Welsh</option>
                          <option value="da">🇩🇰 Danish</option>
                          <option value="de">🇩🇪 German</option>
                          <option value="el">🇬🇷 Greek</option>
                          <option value="en">🇺🇸 English</option>
                          <option value="es">🇪🇸 Spanish</option>
                          <option value="et">🇪🇪 Estonian</option>
                          <option value="eu">🇪🇸 Basque</option>
                          <option value="fa">🇮🇷 Persian</option>
                          <option value="fi">🇫🇮 Finnish</option>
                          <option value="fo">🇫🇴 Faroese</option>
                          <option value="fr">🇫🇷 French</option>
                          <option value="gl">🇪🇸 Galician</option>
                          <option value="gu">🇮🇳 Gujarati</option>
                          <option value="ha">🇳🇬 Hausa</option>
                          <option value="haw">🇺🇸 Hawaiian</option>
                          <option value="he">🇮🇱 Hebrew</option>
                          <option value="hi">🇮🇳 Hindi</option>
                          <option value="hr">🇭🇷 Croatian</option>
                          <option value="ht">🇭🇹 Haitian Creole</option>
                          <option value="hu">🇭🇺 Hungarian</option>
                          <option value="hy">🇦🇲 Armenian</option>
                          <option value="id">🇮🇩 Indonesian</option>
                          <option value="is">🇮🇸 Icelandic</option>
                          <option value="it">🇮🇹 Italian</option>
                          <option value="ja">🇯🇵 Japanese</option>
                          <option value="jw">🇮🇩 Javanese</option>
                          <option value="ka">🇬🇪 Georgian</option>
                          <option value="kk">🇰🇿 Kazakh</option>
                          <option value="km">🇰🇭 Khmer</option>
                          <option value="kn">🇮🇳 Kannada</option>
                          <option value="ko">🇰🇷 Korean</option>
                          <option value="la">🏛️ Latin</option>
                          <option value="lb">🇱🇺 Luxembourgish</option>
                          <option value="ln">🇨🇩 Lingala</option>
                          <option value="lo">🇱🇦 Lao</option>
                          <option value="lt">🇱🇹 Lithuanian</option>
                          <option value="lv">🇱🇻 Latvian</option>
                          <option value="mg">🇲🇬 Malagasy</option>
                          <option value="mi">🇳🇿 Maori</option>
                          <option value="mk">🇲🇰 Macedonian</option>
                          <option value="ml">🇮🇳 Malayalam</option>
                          <option value="mn">🇲🇳 Mongolian</option>
                          <option value="mr">🇮🇳 Marathi</option>
                          <option value="ms">🇲🇾 Malay</option>
                          <option value="mt">🇲🇹 Maltese</option>
                          <option value="my">🇲🇲 Myanmar</option>
                          <option value="ne">🇳🇵 Nepali</option>
                          <option value="nl">🇳🇱 Dutch</option>
                          <option value="nn">🇳🇴 Norwegian Nynorsk</option>
                          <option value="no">🇳🇴 Norwegian</option>
                          <option value="oc">🇫🇷 Occitan</option>
                          <option value="pa">🇮🇳 Punjabi</option>
                          <option value="pl">🇵🇱 Polish</option>
                          <option value="ps">🇦🇫 Pashto</option>
                          <option value="pt">🇵🇹 Portuguese</option>
                          <option value="ro">🇷🇴 Romanian</option>
                          <option value="ru">🇷🇺 Russian</option>
                          <option value="sa">🇮🇳 Sanskrit</option>
                          <option value="sd">🇵🇰 Sindhi</option>
                          <option value="si">🇱🇰 Sinhala</option>
                          <option value="sk">🇸🇰 Slovak</option>
                          <option value="sl">🇸🇮 Slovenian</option>
                          <option value="sn">🇿🇼 Shona</option>
                          <option value="so">🇸🇴 Somali</option>
                          <option value="sq">🇦🇱 Albanian</option>
                          <option value="sr">🇷🇸 Serbian</option>
                          <option value="su">🇮🇩 Sundanese</option>
                          <option value="sv">🇸🇪 Swedish</option>
                          <option value="sw">🇹🇿 Swahili</option>
                          <option value="ta">🇮🇳 Tamil</option>
                          <option value="te">🇮🇳 Telugu</option>
                          <option value="tg">🇹🇯 Tajik</option>
                          <option value="th">🇹🇭 Thai</option>
                          <option value="tk">🇹🇲 Turkmen</option>
                          <option value="tl">🇵🇭 Tagalog</option>
                          <option value="tr">🇹🇷 Turkish</option>
                          <option value="tt">🇷🇺 Tatar</option>
                          <option value="uk">🇺🇦 Ukrainian</option>
                          <option value="ur">🇵🇰 Urdu</option>
                          <option value="uz">🇺🇿 Uzbek</option>
                          <option value="vi">🇻🇳 Vietnamese</option>
                          <option value="yi">🇮🇱 Yiddish</option>
                          <option value="yo">🇳🇬 Yoruba</option>
                          <option value="zh">🇨🇳 Chinese</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div id="tab-panel-file" role="tabpanel" aria-labelledby="tab-file">
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-16 text-center transition mb-8 ${
                        dragActive ? 'border-blue-400 bg-blue-50' : 'border-neutral-300'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                          </div>
                          <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                            </svg>
                          </div>
                          <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-lg text-neutral-700 mb-4">Click or drag & drop to upload your audio</p>
                          <input
                            type="file"
                            accept="audio/*,video/*"
                            onChange={(e) => {
                              setFile(e.target.files?.[0] || null)
                            }}
                            className="hidden"
                            id="file-upload"
                          />
                          <label
                            htmlFor="file-upload"
                            className="inline-block px-8 py-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition text-base font-medium cursor-pointer"
                          >
                            Upload a file
                          </label>
                          <p className="text-sm text-neutral-500 mt-4">MP3, MP4, WAV, M4A up to 500MB</p>
                        </div>
                      </div>
                    </div>

                    {file && (
                      <div className="p-6 bg-neutral-50 rounded-xl flex items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                            🎵
                          </div>
                          <div className="text-left">
                            <p className="font-medium truncate max-w-[200px] sm:max-w-none">{file.name}</p>
                            <p className="text-sm text-neutral-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setFile(null)}
                          className="text-sm text-neutral-500 hover:text-black px-3 py-1 rounded-lg hover:bg-white transition"
                        >
                          Remove
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="source-language-file" className="block text-sm font-medium text-neutral-700 mb-3">
                          Source Language
                        </label>
                        <select
                          id="source-language-file"
                          value={sourceLang}
                          onChange={(e) => setSourceLang(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        >
                          <option value="auto">🔍 Auto-detect</option>
                          <option value="af">🇿🇦 Afrikaans</option>
                          <option value="am">🇪🇹 Amharic</option>
                          <option value="ar">🇸🇦 Arabic</option>
                          <option value="as">🇮🇳 Assamese</option>
                          <option value="az">🇦🇿 Azerbaijani</option>
                          <option value="ba">🇷🇺 Bashkir</option>
                          <option value="be">🇧🇾 Belarusian</option>
                          <option value="bg">🇧🇬 Bulgarian</option>
                          <option value="bn">🇧🇩 Bengali</option>
                          <option value="bo">🇨🇳 Tibetan</option>
                          <option value="br">🇫🇷 Breton</option>
                          <option value="bs">🇧🇦 Bosnian</option>
                          <option value="ca">🇪🇸 Catalan</option>
                          <option value="cs">🇨🇿 Czech</option>
                          <option value="cy">🇬🇧 Welsh</option>
                          <option value="da">🇩🇰 Danish</option>
                          <option value="de">🇩🇪 German</option>
                          <option value="el">🇬🇷 Greek</option>
                          <option value="en">🇺🇸 English</option>
                          <option value="es">🇪🇸 Spanish</option>
                          <option value="et">🇪🇪 Estonian</option>
                          <option value="eu">🇪🇸 Basque</option>
                          <option value="fa">🇮🇷 Persian</option>
                          <option value="fi">🇫🇮 Finnish</option>
                          <option value="fo">🇫🇴 Faroese</option>
                          <option value="fr">🇫🇷 French</option>
                          <option value="gl">🇪🇸 Galician</option>
                          <option value="gu">🇮🇳 Gujarati</option>
                          <option value="ha">🇳🇬 Hausa</option>
                          <option value="haw">🇺🇸 Hawaiian</option>
                          <option value="he">🇮🇱 Hebrew</option>
                          <option value="hi">🇮🇳 Hindi</option>
                          <option value="hr">🇭🇷 Croatian</option>
                          <option value="ht">🇭🇹 Haitian Creole</option>
                          <option value="hu">🇭🇺 Hungarian</option>
                          <option value="hy">🇦🇲 Armenian</option>
                          <option value="id">🇮🇩 Indonesian</option>
                          <option value="is">🇮🇸 Icelandic</option>
                          <option value="it">🇮🇹 Italian</option>
                          <option value="ja">🇯🇵 Japanese</option>
                          <option value="jw">🇮🇩 Javanese</option>
                          <option value="ka">🇬🇪 Georgian</option>
                          <option value="kk">🇰🇿 Kazakh</option>
                          <option value="km">🇰🇭 Khmer</option>
                          <option value="kn">🇮🇳 Kannada</option>
                          <option value="ko">🇰🇷 Korean</option>
                          <option value="la">🏛️ Latin</option>
                          <option value="lb">🇱🇺 Luxembourgish</option>
                          <option value="ln">🇨🇩 Lingala</option>
                          <option value="lo">🇱🇦 Lao</option>
                          <option value="lt">🇱🇹 Lithuanian</option>
                          <option value="lv">🇱🇻 Latvian</option>
                          <option value="mg">🇲🇬 Malagasy</option>
                          <option value="mi">🇳🇿 Maori</option>
                          <option value="mk">🇲🇰 Macedonian</option>
                          <option value="ml">🇮🇳 Malayalam</option>
                          <option value="mn">🇲🇳 Mongolian</option>
                          <option value="mr">🇮🇳 Marathi</option>
                          <option value="ms">🇲🇾 Malay</option>
                          <option value="mt">🇲🇹 Maltese</option>
                          <option value="my">🇲🇲 Myanmar</option>
                          <option value="ne">🇳🇵 Nepali</option>
                          <option value="nl">🇳🇱 Dutch</option>
                          <option value="nn">🇳🇴 Norwegian Nynorsk</option>
                          <option value="no">🇳🇴 Norwegian</option>
                          <option value="oc">🇫🇷 Occitan</option>
                          <option value="pa">🇮🇳 Punjabi</option>
                          <option value="pl">🇵🇱 Polish</option>
                          <option value="ps">🇦🇫 Pashto</option>
                          <option value="pt">🇵🇹 Portuguese</option>
                          <option value="ro">🇷🇴 Romanian</option>
                          <option value="ru">🇷🇺 Russian</option>
                          <option value="sa">🇮🇳 Sanskrit</option>
                          <option value="sd">🇵🇰 Sindhi</option>
                          <option value="si">🇱🇰 Sinhala</option>
                          <option value="sk">🇸🇰 Slovak</option>
                          <option value="sl">🇸🇮 Slovenian</option>
                          <option value="sn">🇿🇼 Shona</option>
                          <option value="so">🇸🇴 Somali</option>
                          <option value="sq">🇦🇱 Albanian</option>
                          <option value="sr">🇷🇸 Serbian</option>
                          <option value="su">🇮🇩 Sundanese</option>
                          <option value="sv">🇸🇪 Swedish</option>
                          <option value="sw">🇹🇿 Swahili</option>
                          <option value="ta">🇮🇳 Tamil</option>
                          <option value="te">🇮🇳 Telugu</option>
                          <option value="tg">🇹🇯 Tajik</option>
                          <option value="th">🇹🇭 Thai</option>
                          <option value="tk">🇹🇲 Turkmen</option>
                          <option value="tl">🇵🇭 Tagalog</option>
                          <option value="tr">🇹🇷 Turkish</option>
                          <option value="tt">🇷🇺 Tatar</option>
                          <option value="uk">🇺🇦 Ukrainian</option>
                          <option value="ur">🇵🇰 Urdu</option>
                          <option value="uz">🇺🇿 Uzbek</option>
                          <option value="vi">🇻🇳 Vietnamese</option>
                          <option value="yi">🇮🇱 Yiddish</option>
                          <option value="yo">🇳🇬 Yoruba</option>
                          <option value="zh">🇨🇳 Chinese</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="target-language-file" className="block text-sm font-medium text-neutral-700 mb-3">
                          Translate To (Optional)
                        </label>
                        <select
                          id="target-language-file"
                          value={targetLang}
                          onChange={(e) => setTargetLang(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        >
                          <option value="original">🚫 No translation</option>
                          <option value="af">🇿🇦 Afrikaans</option>
                          <option value="am">🇪🇹 Amharic</option>
                          <option value="ar">🇸🇦 Arabic</option>
                          <option value="as">🇮🇳 Assamese</option>
                          <option value="az">🇦🇿 Azerbaijani</option>
                          <option value="ba">🇷🇺 Bashkir</option>
                          <option value="be">🇧🇾 Belarusian</option>
                          <option value="bg">🇧🇬 Bulgarian</option>
                          <option value="bn">🇧🇩 Bengali</option>
                          <option value="bo">🇨🇳 Tibetan</option>
                          <option value="br">🇫🇷 Breton</option>
                          <option value="bs">🇧🇦 Bosnian</option>
                          <option value="ca">🇪🇸 Catalan</option>
                          <option value="cs">🇨🇿 Czech</option>
                          <option value="cy">🇬🇧 Welsh</option>
                          <option value="da">🇩🇰 Danish</option>
                          <option value="de">🇩🇪 German</option>
                          <option value="el">🇬🇷 Greek</option>
                          <option value="en">🇺🇸 English</option>
                          <option value="es">🇪🇸 Spanish</option>
                          <option value="et">🇪🇪 Estonian</option>
                          <option value="eu">🇪🇸 Basque</option>
                          <option value="fa">🇮🇷 Persian</option>
                          <option value="fi">🇫🇮 Finnish</option>
                          <option value="fo">🇫🇴 Faroese</option>
                          <option value="fr">🇫🇷 French</option>
                          <option value="gl">🇪🇸 Galician</option>
                          <option value="gu">🇮🇳 Gujarati</option>
                          <option value="ha">🇳🇬 Hausa</option>
                          <option value="haw">🇺🇸 Hawaiian</option>
                          <option value="he">🇮🇱 Hebrew</option>
                          <option value="hi">🇮🇳 Hindi</option>
                          <option value="hr">🇭🇷 Croatian</option>
                          <option value="ht">🇭🇹 Haitian Creole</option>
                          <option value="hu">🇭🇺 Hungarian</option>
                          <option value="hy">🇦🇲 Armenian</option>
                          <option value="id">🇮🇩 Indonesian</option>
                          <option value="is">🇮🇸 Icelandic</option>
                          <option value="it">🇮🇹 Italian</option>
                          <option value="ja">🇯🇵 Japanese</option>
                          <option value="jw">🇮🇩 Javanese</option>
                          <option value="ka">🇬🇪 Georgian</option>
                          <option value="kk">🇰🇿 Kazakh</option>
                          <option value="km">🇰🇭 Khmer</option>
                          <option value="kn">🇮🇳 Kannada</option>
                          <option value="ko">🇰🇷 Korean</option>
                          <option value="la">🏛️ Latin</option>
                          <option value="lb">🇱🇺 Luxembourgish</option>
                          <option value="ln">🇨🇩 Lingala</option>
                          <option value="lo">🇱🇦 Lao</option>
                          <option value="lt">🇱🇹 Lithuanian</option>
                          <option value="lv">🇱🇻 Latvian</option>
                          <option value="mg">🇲🇬 Malagasy</option>
                          <option value="mi">🇳🇿 Maori</option>
                          <option value="mk">🇲🇰 Macedonian</option>
                          <option value="ml">🇮🇳 Malayalam</option>
                          <option value="mn">🇲🇳 Mongolian</option>
                          <option value="mr">🇮🇳 Marathi</option>
                          <option value="ms">🇲🇾 Malay</option>
                          <option value="mt">🇲🇹 Maltese</option>
                          <option value="my">🇲🇲 Myanmar</option>
                          <option value="ne">🇳🇵 Nepali</option>
                          <option value="nl">🇳🇱 Dutch</option>
                          <option value="nn">🇳🇴 Norwegian Nynorsk</option>
                          <option value="no">🇳🇴 Norwegian</option>
                          <option value="oc">🇫🇷 Occitan</option>
                          <option value="pa">🇮🇳 Punjabi</option>
                          <option value="pl">🇵🇱 Polish</option>
                          <option value="ps">🇦🇫 Pashto</option>
                          <option value="pt">🇵🇹 Portuguese</option>
                          <option value="ro">🇷🇴 Romanian</option>
                          <option value="ru">🇷🇺 Russian</option>
                          <option value="sa">🇮🇳 Sanskrit</option>
                          <option value="sd">🇵🇰 Sindhi</option>
                          <option value="si">🇱🇰 Sinhala</option>
                          <option value="sk">🇸🇰 Slovak</option>
                          <option value="sl">🇸🇮 Slovenian</option>
                          <option value="sn">🇿🇼 Shona</option>
                          <option value="so">🇸🇴 Somali</option>
                          <option value="sq">🇦🇱 Albanian</option>
                          <option value="sr">🇷🇸 Serbian</option>
                          <option value="su">🇮🇩 Sundanese</option>
                          <option value="sv">🇸🇪 Swedish</option>
                          <option value="sw">🇹🇿 Swahili</option>
                          <option value="ta">🇮🇳 Tamil</option>
                          <option value="te">🇮🇳 Telugu</option>
                          <option value="tg">🇹🇯 Tajik</option>
                          <option value="th">🇹🇭 Thai</option>
                          <option value="tk">🇹🇲 Turkmen</option>
                          <option value="tl">🇵🇭 Tagalog</option>
                          <option value="tr">🇹🇷 Turkish</option>
                          <option value="tt">🇷🇺 Tatar</option>
                          <option value="uk">🇺🇦 Ukrainian</option>
                          <option value="ur">🇵🇰 Urdu</option>
                          <option value="uz">🇺🇿 Uzbek</option>
                          <option value="vi">🇻🇳 Vietnamese</option>
                          <option value="yi">🇮🇱 Yiddish</option>
                          <option value="yo">🇳🇬 Yoruba</option>
                          <option value="zh">🇨🇳 Chinese</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

    


        {/* Transcribe Button */}
        {!paragraphs.length && (file || url) && (
          <div className="text-center mb-6">
            <button
              onClick={handleTranscribe}
              disabled={!canTranscribe}
              className="px-8 py-3 rounded-lg bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition font-medium text-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Transcribing...
                </span>
              ) : 'Start Transcription'}
            </button>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {paragraphs.length > 0 && (
          <div className="space-y-8">
            {/* Summary Card */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Summary</h2>
                  <p className="text-sm text-neutral-600">AI-generated overview of the content</p>
                </div>
                <div className="flex gap-2 flex-col sm:flex-row">
                  <button
                    onClick={copyMarkdown}
                    className="px-4 py-2 rounded-lg border border-neutral-300 hover:border-neutral-400 transition text-sm font-medium"
                  >
                    📋 Copy Markdown
                  </button>
                  <button
                    onClick={downloadSrt}
                    className="px-4 py-2 rounded-lg border border-neutral-300 hover:border-neutral-400 transition text-sm font-medium"
                  >
                    ⬇️ Download SRT
                  </button>
                </div>
              </div>
              <p className="text-neutral-800 leading-relaxed whitespace-pre-wrap">{summary}</p>
            </div>

            {/* Transcript Card */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-1">Transcript</h2>
                <p className="text-xs sm:text-sm text-neutral-600">{paragraphs.length} paragraphs · Timestamped</p>
              </div>
              <div className="space-y-6">
                {paragraphs.map((p, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="hidden sm:block flex-shrink-0 w-32 text-xs text-neutral-500 font-mono pt-1">
                      {formatTimeSimple(p.start)} → {formatTimeSimple(p.end)}
                    </div>
                    <p className="flex-1 text-neutral-800 leading-relaxed">{p.text}</p>
                    <button className="hidden sm:block opacity-0 group-hover:opacity-100 transition text-sm text-neutral-400 hover:text-black">
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* New Transcript Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setFile(null)
                  setUrl("")
                  setParagraphs([])
                  setSrt("")
                  setSummary("")
                  setError(null)
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-neutral-300 hover:border-neutral-400 transition font-medium"
              >
                + New Transcript
              </button>
            </div>
          </div>
        )}
      </div>
      <UpsellModal
        open={upsellOpen}
        onClose={() => setUpsellOpen(false)}
        onPrimary={async () => {
          setUpsellOpen(false)
          try {
            const res = await fetch('/api/stripe/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
            const j = await res.json()
            if (j.url) {
              window.location.href = j.url
            } else {
              window.location.href = '/sign-in'
            }
          } catch {
            window.location.href = '/sign-in'
          }
        }}
        title="Create a free account to continue"
        description="You've reached the guest limit. Sign up to unlock faster transcripts, more minutes, and team features."
        primaryText="Continue with Email"
        secondaryText="Maybe later"
      />
    </div>
  )
}

function formatTime(seconds: number) {
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

function formatTimeSimple(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

