export type Transcript = {
  id: string
  title: string
  url?: string
  fileName?: string
  sourceLanguage: string
  targetLanguage?: string
  paragraphs: Array<{ start: number; end: number; text: string }>
  summary: string
  createdAt: number
  duration: number
}

const STORAGE_KEY = 'capre_transcripts'

export function saveTranscript(transcript: Omit<Transcript, 'id' | 'createdAt'>): Transcript {
  const id = `transcript_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const fullTranscript: Transcript = {
    ...transcript,
    id,
    createdAt: Date.now(),
  }
  
  const transcripts = getTranscripts()
  transcripts.unshift(fullTranscript) // Add to beginning
  
  // Keep only last 50 transcripts
  if (transcripts.length > 50) {
    transcripts.splice(50)
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transcripts))
  return fullTranscript
}

export function getTranscripts(): Transcript[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function getTranscript(id: string): Transcript | null {
  const transcripts = getTranscripts()
  return transcripts.find(t => t.id === id) || null
}

export function deleteTranscript(id: string): void {
  const transcripts = getTranscripts()
  const filtered = transcripts.filter(t => t.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function getTotalMinutesTranscribed(): number {
  const transcripts = getTranscripts()
  return transcripts.reduce((sum, t) => sum + (t.duration / 60), 0)
}

