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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      // Validate file size (max 5MB)
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

      // Get user agent info
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
        // Save to localStorage for dashboard display
        const feedbackItem = {
          id: Date.now().toString(),
          type: selectedType,
          message: feedback,
          imageUrl: imagePreview || undefined,
          userEmail: undefined, // Could be added later with auth
          device: device,
          page: typeof window !== 'undefined' ? window.location.href : '',
          createdAt: Date.now(),
          archived: false,
          projectId: projectId || '714363294e1e3c', // Use provided projectId or default
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

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-2xl w-[380px] max-w-[calc(100vw-2rem)] border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2563EB] to-[#818CF8] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {selectedType === 'issue' && (
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              {selectedType === 'idea' && (
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1z" />
                  </svg>
                </div>
              )}
              {selectedType === 'other' && (
                <div className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
              )}
              <div>
                <h3 className="text-white font-semibold text-sm">
                  {selectedType ? (selectedType === 'issue' ? 'Report an issue' : selectedType === 'idea' ? 'Share an idea' : 'Other feedback') : "What's on your mind?"}
                </h3>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false)
                setTimeout(() => {
                  setSelectedType(null)
                  setFeedback('')
                  setSelectedImage(null)
                  setImagePreview(null)
                  setSubmitted(false)
                }, 300)
              }}
              className="text-white hover:bg-white/20 rounded-lg p-1 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {!selectedType ? (
              // Type selection
              <div>
                <p className="text-gray-700 text-sm mb-4">Choose a feedback type:</p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setSelectedType('issue')}
                    className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 rounded-lg hover:border-[#2563EB] hover:bg-blue-50 transition cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Issue</span>
                  </button>
                  <button
                    onClick={() => setSelectedType('idea')}
                    className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 rounded-lg hover:border-[#2563EB] hover:bg-blue-50 transition cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Idea</span>
                  </button>
                  <button
                    onClick={() => setSelectedType('other')}
                    className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 rounded-lg hover:border-[#2563EB] hover:bg-blue-50 transition cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Other</span>
                  </button>
                </div>
              </div>
            ) : submitted ? (
              // Success message
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Thank you!</h4>
                <p className="text-sm text-gray-600">Your feedback has been submitted.</p>
              </div>
            ) : (
              // Feedback form
              <div>
                <div className="mb-4">
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="I noticed that..."
                    className="w-full h-32 px-4 py-3 border-2 border-[#2563EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-0 resize-none text-sm"
                    autoFocus
                  />
                </div>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-4 relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-[#2563EB] hover:bg-blue-50 transition cursor-pointer"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </label>
                    <button
                      onClick={() => setSelectedType(null)}
                      className="text-gray-600 hover:text-gray-900 transition text-sm font-medium flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!feedback.trim() || isSubmitting}
                    className="px-6 py-2 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1D4ED8] transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isSubmitting ? 'Sending...' : 'Send feedback'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 pb-3 text-center">
            <p className="text-xs text-gray-400">Widget by Feedkit</p>
          </div>
        </div>
      ) : (
        // Floating button - Circle with upward triangle
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-[#F97316] rounded-full shadow-lg hover:bg-[#FB923C] transition flex items-center justify-center group"
          aria-label="Open feedback widget"
        >
          {/* Upward-pointing triangle */}
          <svg 
            className="w-8 h-8 text-white group-hover:scale-110 transition-transform" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 8L6 16h12L12 8z" />
          </svg>
        </button>
      )}
    </div>
  )
}

