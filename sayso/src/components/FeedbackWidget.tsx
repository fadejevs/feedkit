"use client"
import { useState } from 'react'

type FeedbackType = 'issue' | 'idea' | 'other'

interface FeedbackWidgetProps {
  projectId?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

export function FeedbackWidget({ projectId, position = 'bottom-right' }: FeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<FeedbackType | null>(null)
  const [feedback, setFeedback] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  }

  const getPositionClass = () => {
    const pos = position || 'bottom-right'
    return positionClasses[pos as keyof typeof positionClasses] || positionClasses['bottom-right']
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handleSubmit = async () => {
    if (!feedback.trim() || !selectedType) return

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('type', selectedType)
      formData.append('message', feedback)
      if (projectId) formData.append('projectId', projectId)
      formData.append('url', typeof window !== 'undefined' ? window.location.href : '')
      if (selectedImage) {
        formData.append('image', selectedImage)
      }

      let device: string | undefined
      if (typeof window !== 'undefined' && navigator) {
        const userAgent = navigator.userAgent
        const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge)\/(\d+\.\d+)/)
        const browser = browserMatch ? browserMatch[0] : ''
        device = `${browser}, ${navigator.platform}`
      }

      const response = await fetch('/api/feedback', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const feedbackItem = {
          id: Date.now().toString(),
          type: selectedType,
          message: feedback,
          imageUrl: imagePreview || undefined,
          userEmail: undefined,
          device: device,
          page: typeof window !== 'undefined' ? window.location.href : '',
          createdAt: Date.now(),
          archived: false,
          projectId: projectId || '714363294e1e3c',
        }

        const existing = localStorage.getItem('feedkit_feedback')
        const feedbackList = existing ? JSON.parse(existing) : []
        feedbackList.unshift(feedbackItem)
        localStorage.setItem('feedkit_feedback', JSON.stringify(feedbackList))

        setSubmitted(true)
        setTimeout(() => {
          setIsOpen(false)
          setSubmitted(false)
          setSelectedType(null)
          setFeedback('')
          setSelectedImage(null)
          setImagePreview(null)
        }, 2000)
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setSelectedType(null)
      setFeedback('')
      setSelectedImage(null)
      setImagePreview(null)
      setSubmitted(false)
    }, 300)
  }

  const typeConfig = {
    issue: { emoji: '🐛', label: 'Bug', color: 'rose', title: 'Report a bug', subtitle: 'Help us squash it' },
    idea: { emoji: '💡', label: 'Idea', color: 'amber', title: 'Share an idea', subtitle: 'We love new ideas' },
    other: { emoji: '💬', label: 'Other', color: 'slate', title: 'Other feedback', subtitle: 'Tell us anything' },
  }

  return (
    <div className={`fixed ${getPositionClass()} z-50`}>
      {isOpen ? (
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] w-[380px] max-w-[calc(100vw-2rem)] border border-white/20 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Minimal Header */}
          <div className="px-6 pt-5 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {selectedType && (
                <span className="text-2xl">{typeConfig[selectedType].emoji}</span>
              )}
              <div>
                <h3 className="text-gray-900 font-semibold text-lg tracking-tight">
                  {selectedType ? typeConfig[selectedType].title : 'Send feedback'}
                </h3>
                {selectedType && (
                  <p className="text-gray-500 text-xs mt-0.5">{typeConfig[selectedType].subtitle}</p>
                )}
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-5">
            {!selectedType ? (
              // Type selection - Pill chips
              <div className="space-y-4">
                <p className="text-gray-500 text-sm">What type of feedback?</p>
                <div className="flex flex-wrap gap-2">
                  {(['issue', 'idea', 'other'] as FeedbackType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className="group flex items-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-full transition-all duration-200 active:scale-95"
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">{typeConfig[type].emoji}</span>
                      <span className="text-sm font-medium text-gray-700">{typeConfig[type].label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : submitted ? (
              // Success message
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Thanks!</h4>
                <p className="text-sm text-gray-500">Your feedback was sent.</p>
              </div>
            ) : (
              // Feedback form - Clean & minimal
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Describe your feedback..."
                    className="w-full h-32 px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:bg-white resize-none text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200"
                    autoFocus
                  />
                </div>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-2xl bg-gray-100">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-32 object-cover"
                      />
                    </div>
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-all duration-200 backdrop-blur-sm"
                      aria-label="Remove image"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 cursor-pointer"
                      aria-label="Upload image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                    </label>
                    <button
                      onClick={() => setSelectedType(null)}
                      className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                      aria-label="Go back"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!feedback.trim() || isSubmitting}
                    className="px-5 py-2.5 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-sm active:scale-95"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending
                      </span>
                    ) : (
                      'Send'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {!submitted && (
            <div className="px-6 pb-4 pt-2 border-t border-gray-100">
              <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                <span>Powered by</span>
                <svg
                  width="14"
                  height="9"
                  viewBox="0 0 28 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block opacity-60"
                >
                  <circle cx="6" cy="6" r="5" fill="#374151" />
                  <polygon points="17,0.5 23.5,11.5 11,11.5" fill="#9CA3AF" />
                </svg>
                <span className="font-medium text-gray-500">Feedkit</span>
              </p>
            </div>
          )}
        </div>
      ) : (
        // Floating button - Clean pill style
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group active:scale-95"
          aria-label="Open feedback widget"
        >
          <svg 
            className="w-5 h-5 text-white/90 group-hover:scale-110 transition-transform duration-300" 
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          <span className="text-sm font-medium">Feedback</span>
        </button>
      )}
    </div>
  )
}
