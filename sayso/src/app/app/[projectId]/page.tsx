"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { BrandLogo } from '@/components/BrandLogo'
import { Footer } from '@/components/Footer'
import { IntegrationModal } from '@/components/IntegrationModal'
import { FeedbackWidget } from '@/components/FeedbackWidget'
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
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false)
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [projectName, setProjectName] = useState('feedkit')
  const [isLoading, setIsLoading] = useState(true)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)

  const loadFeedback = async (isInitialLoad = false) => {
    try {
      const startTime = Date.now()
      // Fetch both archived and non-archived feedback
      const [activeResponse, archivedResponse] = await Promise.all([
        fetch(`/api/feedback/${projectId}?archived=false`),
        fetch(`/api/feedback/${projectId}?archived=true`),
      ])
      
      if (activeResponse.ok && archivedResponse.ok) {
        const activeData = await activeResponse.json()
        const archivedData = await archivedResponse.json()
        // Combine all feedback
        setFeedback([...(activeData.feedback || []), ...(archivedData.feedback || [])])
        
        if (isInitialLoad) {
          setHasLoadedOnce(true)
          // Ensure minimum 2 second loading time for initial load
          const elapsed = Date.now() - startTime
          const remaining = Math.max(0, 2000 - elapsed)
          setTimeout(() => {
            setIsLoading(false)
          }, remaining)
        }
      } else {
        console.error('Failed to load feedback')
        if (isInitialLoad) {
          setIsLoading(false)
        }
      }
    } catch (e) {
      console.error('Failed to load feedback:', e)
      if (isInitialLoad) {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    setIsLoading(true)
    setHasLoadedOnce(false)
    loadFeedback(true)
    // Refresh feedback every 5 seconds to catch new submissions (without loading state)
    const interval = setInterval(() => {
      loadFeedback(false)
    }, 5000)
    return () => clearInterval(interval)
  }, [projectId])

  const filteredFeedback = feedback.filter((item) => {
    if (selectedFilter === 'all') return !item.archived
    if (selectedFilter === 'archive') return item.archived
    return item.type === selectedFilter && !item.archived
  })

  // Mock feedback item for new users
  const mockFeedback: Feedback = {
    id: 'mock-demo-feedback',
    type: 'idea',
    message: 'This is an example feedback item! Try archiving it, replying to the user, or filtering by type to see how Feedkit works. Once you integrate the widget, real customer feedback will appear here.',
    userEmail: 'demo@example.com',
    device: 'Desktop',
    page: '/dashboard',
    createdAt: Date.now() - 3600000, // 1 hour ago
    archived: false,
    projectId: projectId,
  }

  const shouldShowMock = !isLoading && filteredFeedback.length === 0 && selectedFilter === 'all' && feedback.length === 0 && hasLoadedOnce

  // Include mock feedback in counts if showing it
  const feedbackForCounts = shouldShowMock ? [...feedback, mockFeedback] : feedback
  
  const filterCounts = {
    all: feedbackForCounts.filter(f => !f.archived).length,
    issue: feedbackForCounts.filter(f => f.type === 'issue' && !f.archived).length,
    idea: feedbackForCounts.filter(f => f.type === 'idea' && !f.archived).length,
    other: feedbackForCounts.filter(f => f.type === 'other' && !f.archived).length,
    archive: feedbackForCounts.filter(f => f.archived).length,
  }

  const handleArchive = async (id: string, archive: boolean = true) => {
    try {
      const response = await fetch(`/api/feedback/archive/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archived: archive }),
      })
      
      if (response.ok) {
        // Reload feedback from API
        loadFeedback()
      } else {
        console.error(`Failed to ${archive ? 'archive' : 'unarchive'} feedback`)
      }
    } catch (e) {
      console.error(`Failed to ${archive ? 'archive' : 'unarchive'} feedback:`, e)
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
                <button
                  onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50 transition text-left min-w-[140px]"
                >
                  <span className="flex-1 text-gray-900">{projectName}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </button>
                
                {isProjectDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsProjectDropdownOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <button
                        onClick={() => setIsProjectDropdownOpen(false)}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                      >
                        <span>{projectName}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsProjectDropdownOpen(false)
                            setIsSettingsOpen(true)
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>
                      </button>
                      <div className="border-t border-gray-100">
                        <button
                          onClick={() => setIsProjectDropdownOpen(false)}
                          className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          New Project
                        </button>
                      </div>
                    </div>
                  </>
                )}
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
            <button 
              onClick={() => setIsIntegrationModalOpen(true)}
              className="px-6 py-3 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1D4ED8] transition"
            >
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
                { id: 'all' as FeedbackType, label: 'All', emoji: null, color: '#2563EB' },
                { id: 'issue' as FeedbackType, label: 'Bug', emoji: '🐛', color: '#EF4444' },
                { id: 'idea' as FeedbackType, label: 'Idea', emoji: '💡', color: '#F97316' },
                { id: 'other' as FeedbackType, label: 'Other', emoji: '💬', color: '#6B7280' },
                { id: 'archive' as FeedbackType, label: 'Archive', emoji: null, color: '#6B7280' },
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
                    {filter.emoji ? (
                      <span className="text-base">{filter.emoji}</span>
                    ) : filter.id === 'archive' ? (
                      <div className="w-2 h-2 rounded-full border-2 border-gray-400" />
                    ) : (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: filter.color }} />
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
            
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-[#2563EB]/20 border-t-[#2563EB] rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600">Loading feedback...</p>
                </div>
              </div>
            ) : shouldShowMock ? (
              <div className="space-y-4">
                <FeedbackCard
                  key={mockFeedback.id}
                  feedback={mockFeedback}
                  onArchive={() => {
                    // Show a message that this is a demo
                    alert('This is a demo feedback item. Once you integrate the widget, you\'ll be able to archive real feedback!')
                  }}
                  onReply={() => handleReply(mockFeedback.userEmail)}
                  isDemo={true}
                />
              </div>
            ) : filteredFeedback.length === 0 ? (
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
                  <button 
                    onClick={() => setIsIntegrationModalOpen(true)}
                    className="px-6 py-3 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1D4ED8] transition"
                  >
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
                    onArchive={() => handleArchive(item.id, !item.archived)}
                    onReply={() => handleReply(item.userEmail)}
                    isArchived={item.archived}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer showProjectId={true} projectId={projectId} />

      {/* Integration Modal */}
      <IntegrationModal 
        isOpen={isIntegrationModalOpen}
        onClose={() => setIsIntegrationModalOpen(false)}
        projectId={projectId}
      />

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          projectId={projectId}
          projectName={projectName}
          feedbackCount={feedback.filter(f => !f.archived).length}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {/* Feedback Widget */}
      <FeedbackWidget projectId={projectId} position="bottom-right" />
    </div>
  )
}

function SettingsModal({ projectId, projectName, feedbackCount, onClose }: { projectId: string; projectName: string; feedbackCount: number; onClose: () => void }) {
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-lg"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Project Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                <input
                  type="text"
                  value={projectName}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Id:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={projectId}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-600"
                  />
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Current Plan */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
              <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">Lifetime</span>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                {feedbackCount} feedback submissions
              </p>
              <p className="text-sm text-gray-700">
                <strong>Unlimited feedback submissions</strong>
              </p>
              <p className="text-sm text-gray-700">
                Contact us about Enterprise to additionally unlock: Whitelabeling, service-level agreements and live chat support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeedbackCard({ feedback, onArchive, onReply, isDemo = false, isArchived = false }: { 
  feedback: Feedback
  onArchive: () => void
  onReply: () => void
  isDemo?: boolean
  isArchived?: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const typeConfig = {
    issue: { emoji: '🐛', label: 'Bug', color: 'bg-red-100 text-red-700' },
    idea: { emoji: '💡', label: 'Idea', color: 'bg-orange-100 text-orange-700' },
    other: { emoji: '💬', label: 'Other', color: 'bg-gray-100 text-gray-700' },
  }

  const getTypeColor = (type: string) => {
    return typeConfig[type as keyof typeof typeConfig]?.color || 'bg-gray-100 text-gray-700'
  }

  const getTypeLabel = (type: string) => {
    return typeConfig[type as keyof typeof typeConfig]?.label || type.charAt(0).toUpperCase() + type.slice(1)
  }

  const getTypeEmoji = (type: string) => {
    return typeConfig[type as keyof typeof typeConfig]?.emoji || ''
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

  const hasDetails = !!(feedback.userEmail || feedback.device || feedback.page)

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1.5 ${getTypeColor(feedback.type)}`}>
            <span>{getTypeEmoji(feedback.type)}</span>
            <span>{getTypeLabel(feedback.type)}</span>
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

      {isExpanded && hasDetails && (
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
      )}

      <div className="flex items-center justify-between gap-3">
        {hasDetails && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition flex items-center gap-1"
          >
            <svg 
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {isExpanded ? 'Hide details' : 'Show details'}
          </button>
        )}
        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={onArchive}
            className={`px-4 py-2 text-sm rounded-lg transition ${
              isArchived
                ? 'text-white bg-gray-600 border border-gray-600 hover:bg-gray-700'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {isArchived ? 'Unarchive' : 'Archive'}
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
    </div>
  )
}

