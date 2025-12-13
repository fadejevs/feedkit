import { supabase } from './supabaseClient'
import { getTranscripts, saveTranscript, deleteTranscript, getTotalMinutesTranscribed, type Transcript } from './transcriptStorage'

export async function repoSaveTranscript(userId: string | null, t: Omit<Transcript, 'id' | 'createdAt'>): Promise<Transcript> {
  if (userId && supabase) {
    // Serialize paragraphs and summary into content for database storage
    const content = JSON.stringify({ paragraphs: t.paragraphs, summary: t.summary })
    const { data, error } = await supabase
      .from('transcripts')
      .insert({ user_id: userId, title: t.title, duration: t.duration, url: t.url ?? null, source_language: t.sourceLanguage ?? null, target_language: t.targetLanguage ?? null, content })
      .select('*')
      .single()
    if (error) throw error
    // Deserialize content back to paragraphs and summary
    const parsedContent = data.content ? JSON.parse(data.content) : { paragraphs: [], summary: '' }
    return {
      id: data.id,
      title: data.title,
      duration: data.duration,
      url: data.url ?? undefined,
      sourceLanguage: data.source_language ?? undefined,
      targetLanguage: data.target_language ?? undefined,
      paragraphs: parsedContent.paragraphs || [],
      summary: parsedContent.summary || '',
      createdAt: new Date(data.created_at).getTime(),
    }
  }
  return saveTranscript(t)
}

export async function repoListTranscripts(userId: string | null): Promise<Transcript[]> {
  if (userId && supabase) {
    const { data, error } = await supabase
      .from('transcripts')
      .select('id, title, duration, url, source_language, target_language, content, created_at')
      .order('created_at', { ascending: false })
    if (error) throw error
    return (data ?? []).map((r: any) => {
      // Deserialize content back to paragraphs and summary
      const parsedContent = r.content ? JSON.parse(r.content) : { paragraphs: [], summary: '' }
      return {
        id: r.id,
        title: r.title,
        duration: r.duration,
        url: r.url ?? undefined,
        sourceLanguage: r.source_language ?? undefined,
        targetLanguage: r.target_language ?? undefined,
        paragraphs: parsedContent.paragraphs || [],
        summary: parsedContent.summary || '',
        createdAt: new Date(r.created_at).getTime(),
      }
    })
  }
  return getTranscripts()
}

export async function repoDeleteTranscript(userId: string | null, id: string): Promise<void> {
  if (userId && supabase) {
    const { error } = await supabase.from('transcripts').delete().eq('id', id)
    if (error) throw error
    return
  }
  deleteTranscript(id)
}

export async function repoTotalMinutes(userId: string | null): Promise<number> {
  if (userId && supabase) {
    const list = await repoListTranscripts(userId)
    return list.reduce((acc, t) => acc + (t.duration || 0) / 60, 0)
  }
  return getTotalMinutesTranscribed()
}



