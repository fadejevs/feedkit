"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { BrandLogo } from '@/components/BrandLogo'
import { Footer } from '@/components/Footer'
import { useAuth } from '@/hooks/useAuth'

type FeedbackType = 'all' | 'issue' | 'idea' | 'other' | 'archive'

interface Feedback {
  id: string
  type: 'issue' | 'idea' | 'other'
  message: string
  imageUrl?: string
  userEmail?: string
  device?: string
  page?: string
  createdAt: number
  archived?: boolean
  projectId?: string
}

export default function AppProjectPage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading: authLoading, signOut } = useAuth()
  const projectId = params.projectId as string

  // Redirect if user tries to access a project that's not theirs
  useEffect(() => {
    if (!authLoading && user && user.projectId && projectId !== user.projectId) {
      router.replace(`/app/${user.projectId}`)
    }
  }, [user, projectId, authLoading, router])
  
  const [selectedFilter, setSelectedFilter] = useState<FeedbackType>('all')
  const [feedback, setFeedback] = useState<Feedback[]>([])

  useEffect(() => {
    // Load feedback from localStorage filtered by projectId
    const stored = localStorage.getItem('feedkit_feedback')
    if (stored) {
      try {
        const allFeedback = JSON.parse(stored)
        // Filter feedback by projectId, or show all if projectId matches
        const projectFeedback = allFeedback.filter((f: Feedback) => 
          !f.projectId || f.projectId === projectId
        )
        setFeedback(projectFeedback)
      } catch (e) {
        console.error('Failed to load feedback:', e)
      }
    }
  }, [projectId])

  const filteredFeedback = feedback.filter((item) => {
    if (selectedFilter === 'all') return !item.archived
    if (selectedFilter === 'archive') return item.archived
    return item.type === selectedFilter && !item.archived
  })

  const filterCounts = {
    all: feedback.filter(f => !f.archived).length,
    issue: feedback.filter(f => f.type === 'issue' && !f.archived).length,
    idea: feedback.filter(f => f.type === 'idea' && !f.archived).length,
    other: feedback.filter(f => f.type === 'other' && !f.archived).length,
    archive: feedback.filter(f => f.archived).length,
  }

  const handleArchive = (id: string) => {
    const updated = feedback.map(f => 
      f.id === id ? { ...f, archived: true } : f
    )
    setFeedback(updated)
    // Update localStorage with all feedback
    const stored = localStorage.getItem('feedkit_feedback')
    if (stored) {
      try {
        const allFeedback = JSON.parse(stored)
        const updatedAll = allFeedback.map((f: Feedback) => 
          f.id === id ? { ...f, archived: true } : f
        )
        localStorage.setItem('feedkit_feedback', JSON.stringify(updatedAll))
      } catch (e) {
        console.error('Failed to update feedback:', e)
      }
    }
  }

  const handleReply = (email?: string) => {
    if (email) {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <BrandLogo size={24} />
              </Link>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Project name"
                  defaultValue="feedkit"
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                />
                <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Help</Link>
              <button
                onClick={async () => {
                  await signOut()
                  router.push('/')
                }}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#2563EB]/10 via-[#818CF8]/10 to-[#2563EB]/10 border-b border-[#2563EB]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to your Feedkit dashboard! 👋
              </h1>
              <p className="text-gray-600">
                Integrate the widget into your website and start collecting customer feedback.
              </p>
            </div>
            <button className="px-6 py-3 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1D4ED8] transition">
              Integrate widget &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <aside className="w-48 flex-shrink-0">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">FILTER</h2>
            <div className="space-y-2">
              {[
                { id: 'all' as FeedbackType, label: 'All', color: '#2563EB' },
                { id: 'issue' as FeedbackType, label: 'Issue', color: '#EF4444' },
                { id: 'idea' as FeedbackType, label: 'Idea', color: '#F97316' },
                { id: 'other' as FeedbackType, label: 'Other', color: '#6B7280' },
                { id: 'archive' as FeedbackType, label: 'Archive', color: '#6B7280' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition ${
                    selectedFilter === filter.id
                      ? 'bg-[#2563EB]/10 text-[#2563EB]'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {filter.id !== 'archive' ? (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: filter.color }} />
                    ) : (
                      <div className="w-2 h-2 rounded-full border-2 border-gray-400" />
                    )}
                    <span>{filter.label}</span>
                  </div>
                  <span className="text-gray-500">{filterCounts[filter.id]}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Feedback Display */}
          <main className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Feedback</h2>
            
            {filteredFeedback.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No feedback yet</h3>
                <p className="text-gray-600 mb-6">
                  {selectedFilter === 'all' 
                    ? "Once you integrate the widget, customer feedback will appear here."
                    : `No ${selectedFilter} feedback found.`}
                </p>
                {selectedFilter === 'all' && (
                  <button className="px-6 py-3 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1D4ED8] transition">
                    Integrate widget &gt;
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFeedback.map((item) => (
                  <FeedbackCard
                    key={item.id}
                    feedback={item}
                    onArchive={() => handleArchive(item.id)}
                    onReply={() => handleReply(item.userEmail)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer showProjectId={true} projectId={projectId} />
    </div>
  )
}

function FeedbackCard({ feedback, onArchive, onReply }: { 
  feedback: Feedback
  onArchive: () => void
  onReply: () => void
}) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'issue': return 'bg-red-100 text-red-700'
      case 'idea': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
    return new Date(timestamp).toLocaleDateString()
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(feedback.type)}`}>
            {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
          </span>
        </div>
        <span className="text-sm text-gray-500">{formatTimeAgo(feedback.createdAt)}</span>
      </div>

      <p className="text-gray-900 mb-4 leading-relaxed">{feedback.message}</p>

      {feedback.imageUrl && (
        <div className="mb-4">
          <img 
            src={feedback.imageUrl} 
            alt="Feedback attachment" 
            className="max-w-full h-auto rounded-lg border border-gray-200"
          />
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
        {feedback.userEmail && (
          <div>
            <span className="font-medium">USER:</span> {feedback.userEmail}
          </div>
        )}
        {feedback.device && (
          <div>
            <span className="font-medium">DEVICE:</span> {feedback.device}
          </div>
        )}
        {feedback.page && (
          <div>
            <span className="font-medium">PAGE:</span> {feedback.page}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onArchive}
          className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Archive
        </button>
        {feedback.userEmail && (
          <button
            onClick={onReply}
            className="px-4 py-2 text-sm text-[#2563EB] bg-[#2563EB]/10 rounded-lg hover:bg-[#2563EB]/20 transition"
          >
            Reply with Mail
          </button>
        )}
      </div>
    </div>
  )
}

