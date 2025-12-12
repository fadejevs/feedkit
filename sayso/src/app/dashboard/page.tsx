"use client"
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { useEffect, useState } from 'react'
import { repoListTranscripts, repoTotalMinutes } from '@/lib/transcriptRepository'
import type { Transcript } from '@/lib/transcriptStorage'

export default function DashboardPage() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([])
  const [totalMinutes, setTotalMinutes] = useState(0)

  useEffect(() => {
    let mounted = true
    const user = typeof window !== 'undefined' ? (localStorage.getItem('sayso_auth') ? { id: 'local-user', email: 'guest' } : null) : null
    repoListTranscripts(user?.id ?? null).then((list) => mounted && setTranscripts(list)).catch(console.error)
    repoTotalMinutes(user?.id ?? null).then((mins) => mounted && setTotalMinutes(mins)).catch(console.error)
    return () => { mounted = false }
  }, [])

  const recentTranscripts = transcripts.slice(0, 5)

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-neutral-600">Your transcription history, stats, and exports.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <StatCard label="Total Transcripts" value={transcripts.length.toString()} icon="📝" />
          <StatCard label="Minutes Transcribed" value={Math.round(totalMinutes).toString()} icon="⏱️" />
          <StatCard label="This Month" value={transcripts.filter(t => t.createdAt > Date.now() - 30 * 24 * 60 * 60 * 1000).length.toString()} icon="📊" />
        </div>

        {/* Empty State or Recent Transcripts */}
        {transcripts.length === 0 ? (
          <div className="bg-white rounded-xl border-2 border-dashed border-neutral-300 p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">No transcripts yet</h3>
            <p className="text-neutral-600 mb-6">Start by pasting a social media link or uploading an audio file.</p>
            <Link
              href="/dashboard/transcribe"
              className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
            >
              Create Your First Transcript
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Transcripts</h2>
            </div>
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-medium text-neutral-600 uppercase">Title</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-neutral-600 uppercase">Duration</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-neutral-600 uppercase">Language</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-neutral-600 uppercase">Created</th>
                      <th className="text-right px-6 py-3 text-xs font-medium text-neutral-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {recentTranscripts.map((transcript) => (
                      <TranscriptRow key={transcript.id} transcript={transcript} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-neutral-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <p className="text-sm text-neutral-600">{label}</p>
    </div>
  )
}

function TranscriptRow({ transcript }: { transcript: Transcript }) {
  const duration = formatDuration(transcript.duration)
  const created = formatTimeAgo(transcript.createdAt)
  const icon = transcript.url ? '🔗' : '🎵'

  return (
    <tr className="hover:bg-neutral-50 transition">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center text-lg">
            {icon}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{transcript.title}</p>
            {transcript.url && (
              <p className="text-xs text-neutral-500 truncate max-w-[200px]">{transcript.url}</p>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-neutral-600">{duration}</td>
      <td className="px-6 py-4">
        <span className="text-sm text-neutral-600">
          {transcript.sourceLanguage?.toUpperCase() || 'N/A'}
          {transcript.targetLanguage && ` → ${transcript.targetLanguage.toUpperCase()}`}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-neutral-600">{created}</td>
      <td className="px-6 py-4 text-right">
        <button 
          onClick={() => {
            // TODO: Navigate to transcript detail page
            alert('Transcript detail view coming soon!')
          }}
          className="text-sm text-neutral-600 hover:text-black"
        >
          View →
        </button>
      </td>
    </tr>
  )
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function formatTimeAgo(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return new Date(timestamp).toLocaleDateString()
}
