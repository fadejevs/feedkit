"use client"

import { useState } from 'react'
import Image from 'next/image'

interface IntegrationModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
}

// Provider Logo Components
const ReactLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
    <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
    <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(-60 12 12)"/>
  </svg>
)

const VueLogo = () => (
  <Image 
    src="/provider-logos/Vue.js_Logo_2.svg.png" 
    alt="Vue.js" 
    width={20} 
    height={20} 
    className="object-contain"
  />
)

const WordPressLogo = () => (
  <Image 
    src="/provider-logos/WordPress_blue_logo.svg.png" 
    alt="WordPress" 
    width={20} 
    height={20} 
    className="object-contain"
  />
)

const BootstrapLogo = () => (
  <Image 
    src="/provider-logos/Bootstrap_logo.svg.png" 
    alt="Bootstrap" 
    width={20} 
    height={20} 
    className="object-contain"
  />
)

const integrations = [
  {
    id: 'html',
    name: 'HTML',
    icon: (
      <div className="w-6 h-6 flex items-center justify-center bg-gray-900 text-white rounded font-mono text-xs font-bold">
        {'</>'}
      </div>
    ),
  },
  {
    id: 'react',
    name: 'React',
    icon: <ReactLogo />,
  },
  {
    id: 'vue',
    name: 'Vue',
    icon: <VueLogo />,
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    icon: <WordPressLogo />,
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    icon: <BootstrapLogo />,
  },
  {
    id: 'custom',
    name: 'Build your own form',
    icon: (
      <div className="w-6 h-6 flex items-center justify-center bg-gray-900 text-white rounded font-mono text-xs font-bold">
        {'</>'}
      </div>
    ),
  },
]

export function IntegrationModal({ isOpen, onClose, projectId }: IntegrationModalProps) {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)
  const [developerEmail, setDeveloperEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  if (!isOpen) return null

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const widgetUrl = `${baseUrl}/widget?projectId=${projectId}&pos=bottom-right`
  const apiUrl = `${baseUrl}/api/feedback`
  
  // For production, replace with your actual domain
  const productionBaseUrl = baseUrl.includes('localhost') 
    ? 'https://yourdomain.com' // Replace with your actual domain
    : baseUrl

  const getCodeSnippet = (integrationId: string) => {
    switch (integrationId) {
      case 'html':
        return `<iframe 
  src="${productionBaseUrl}/widget?projectId=${projectId}&pos=bottom-right" 
  style="width:400px;height:520px;border:0;" 
  allow="clipboard-read; clipboard-write"
  title="Feedback Widget"
></iframe>

<!-- Add this before closing </body> tag -->`
      
      case 'react':
        return `import { FeedbackWidget } from '@feedkit/react'

function App() {
  return (
    <FeedbackWidget 
      projectId="${projectId}"
      position="bottom-right"
      apiUrl="${apiUrl}"
    />
  )
}`
      
      case 'vue':
        return `<template>
  <FeedbackWidget 
    :project-id="${projectId}"
    position="bottom-right"
  />
</template>

<script setup>
import { FeedbackWidget } from '@feedkit/vue'
</script>`
      
      case 'wordpress':
        return `1. Install the Feedkit WordPress plugin
2. Go to Settings > Feedkit
3. Enter your Project ID: ${projectId}
4. The widget will appear automatically`
      
      case 'bootstrap':
        return `<iframe 
  src="${productionBaseUrl}/widget?projectId=${projectId}&pos=bottom-right" 
  style="width:400px;height:520px;border:0;position:fixed;bottom:20px;right:20px;z-index:9999;" 
  allow="clipboard-read; clipboard-write"
  title="Feedback Widget"
></iframe>`
      
      case 'custom':
        return `// Use our API endpoint
POST ${apiUrl}
Content-Type: multipart/form-data

Form Data:
- type: "idea|issue|other"
- message: "Your feedback message"
- projectId: "${projectId}"
- url: window.location.href
- image: (optional) File object

Example with fetch:
fetch('${apiUrl}', {
  method: 'POST',
  body: formData
})`
      
      default:
        return ''
    }
  }

  const handleSendToDeveloper = async () => {
    if (!developerEmail || !developerEmail.includes('@')) {
      alert('Please enter a valid email address')
      return
    }

    const subject = encodeURIComponent('Feedkit Widget Integration Instructions')
    const body = encodeURIComponent(`Hi,

I'd like to integrate the Feedkit feedback widget into our website.

Project ID: ${projectId}

Integration options:
${baseUrl}/widget/builder?projectId=${projectId}

You can find all integration methods and code snippets at the link above.

Thanks!`)

    window.location.href = `mailto:${developerEmail}?subject=${subject}&body=${body}`
    setEmailSent(true)
    setTimeout(() => {
      setEmailSent(false)
      setDeveloperEmail('')
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Get started with Feedkit</h2>
            <p className="text-sm text-gray-600">
              Integrate the widget into your website to start collecting customer feedback.{' '}
              <a href="mailto:hello@feedkit.co" className="text-[#2563EB] hover:underline">
                Reach out anytime
              </a>
              , we're here to help!
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-lg ml-4 flex-shrink-0"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Integration Options */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mb-5">
            {integrations.map((integration) => (
              <button
                key={integration.id}
                onClick={() => setSelectedIntegration(
                  selectedIntegration === integration.id ? null : integration.id
                )}
                className={`p-3 rounded-lg border transition-all text-left ${
                  selectedIntegration === integration.id
                    ? 'border-[#2563EB] bg-[#2563EB]/5'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-shrink-0">
                    {integration.icon}
                  </div>
                  <span className="font-medium text-sm text-gray-900">{integration.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Code Snippet */}
          {selectedIntegration && (
            <div className="mb-5 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900">
                  {integrations.find(i => i.id === selectedIntegration)?.name} Integration
                </h3>
                <button
                  onClick={() => {
                    const code = getCodeSnippet(selectedIntegration)
                    navigator.clipboard.writeText(code)
                    alert('Code copied to clipboard!')
                  }}
                  className="px-3 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 transition"
                >
                  Copy code
                </button>
              </div>
              <pre className="text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto">
                <code>{getCodeSnippet(selectedIntegration)}</code>
              </pre>
            </div>
          )}

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Send to Developer */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-700 mb-3">
              You can also send these instructions to your developer instead.
            </p>
            <div className="flex gap-2">
              <div className="flex-1">
                <label htmlFor="developer-email" className="block text-xs font-medium text-gray-700 mb-1.5">
                  Developer Email
                </label>
                <input
                  id="developer-email"
                  type="email"
                  value={developerEmail}
                  onChange={(e) => setDeveloperEmail(e.target.value)}
                  placeholder="annette@mycompany.com"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleSendToDeveloper}
                  disabled={emailSent}
                  className="px-5 py-2 text-sm bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1D4ED8] transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {emailSent ? 'Sent!' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

