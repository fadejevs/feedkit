"use client"
import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { BrandLogo } from '@/components/BrandLogo'
import { getOrCreateProjectId } from '@/lib/projectId'

function SignInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  async function handleGoogleSignIn() {
    setLoading(true)
    try {
      if (!supabase) {
        // Supabase not configured - show detailed error
        const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
        const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        console.error('Supabase configuration check:', {
          hasUrl,
          hasKey,
          urlValue: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
          keyValue: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
        })
        alert(
          `Google authentication is not configured.\n\n` +
          `Missing: ${!hasUrl ? 'NEXT_PUBLIC_SUPABASE_URL' : ''} ${!hasKey ? 'NEXT_PUBLIC_SUPABASE_ANON_KEY' : ''}\n\n` +
          `Please create a .env.local file with these variables and restart your dev server.`
        )
        setLoading(false)
        return
      }

      // Get intent from query params (e.g., 'lifetime' for lifetime deal purchase)
      const intent = searchParams?.get('intent')
      const callbackUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000') + '/auth/callback' + (intent ? `?intent=${intent}` : '')

      // Real Google OAuth flow - this will redirect to Google
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl,
        },
      })
      
      if (error) {
        console.error('OAuth error:', error)
        setLoading(false)
        alert('Failed to initiate Google sign-in. Please try again.')
        throw error
      }
      // OAuth will redirect to Google, then back to /auth/callback
      // Don't set loading to false here as we're redirecting
    } catch (err) {
      console.error('Sign in error:', err)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <Link href="/" className="inline-block mb-6">
          <BrandLogo size={28} showText={true} />
        </Link>
        <h1 className="text-2xl font-semibold mb-2">Sign in to Feedkit</h1>
        <p className="text-sm text-neutral-600 mb-6">Continue with your Google account for instant access.</p>
        
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full px-4 py-3 rounded-lg bg-white border-2 border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 transition text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>

        <p className="text-xs text-neutral-600 mt-6 text-center">By continuing you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy</a>.</p>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  )
}


