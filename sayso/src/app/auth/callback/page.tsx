"use client"
import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { getOrCreateProjectId } from '@/lib/projectId'

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Signing you in...')

  useEffect(() => {
    const handleCallback = async () => {
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          const email = session.user.email || ''
          const projectId = getOrCreateProjectId(session.user.id, email)
          
          // Check if user just upgraded (came back from Stripe checkout)
          const upgraded = searchParams?.get('upgraded') === '1'
          
          // Check if user signed in with intent to purchase Pro plan
          const intent = searchParams?.get('intent')
          
          if (upgraded) {
            // User just completed checkout, redirect to dashboard
            setStatus('success')
            setMessage('🎉 Welcome! Your subscription is being activated...')
            // Give user a moment to see success message
            setTimeout(() => {
              router.replace(`/app/${projectId}`)
            }, 2000)
          } else if (intent === 'pro') {
            // User signed in with intent to purchase Pro plan
            // Redirect to checkout immediately
            setMessage('Redirecting to checkout...')
            try {
              const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
              })
              
              const data = await response.json()
              
              if (data.error) {
                alert(data.error)
                router.replace(`/app/${projectId}`)
                return
              }
              
              if (data.url) {
                window.location.href = data.url
              } else {
                router.replace(`/app/${projectId}`)
              }
            } catch (error) {
              console.error('Failed to create checkout session:', error)
              alert('Failed to start checkout. Please try again.')
              router.replace(`/app/${projectId}`)
            }
          } else {
            // Free plan or regular auth callback, just redirect to dashboard
            router.replace(`/app/${projectId}`)
          }
        } else {
          // No session - check if this is after a payment
          const upgraded = searchParams?.get('upgraded') === '1'
          
          if (upgraded) {
            // User just paid but isn't signed in yet
            // Redirect to sign-in with a message
            router.replace('/sign-in?payment=success&email=' + encodeURIComponent(searchParams?.get('email') || ''))
          } else {
            // Regular callback, redirect to sign in
            router.replace('/sign-in')
          }
        }
      } else {
        // Fallback for development
        router.replace('/sign-in')
      }
    }

    handleCallback()
  }, [router, searchParams])

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2563EB] mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto mb-4"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  )
}

