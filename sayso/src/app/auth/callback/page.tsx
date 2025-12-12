"use client"
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { getOrCreateProjectId } from '@/lib/projectId'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          const email = session.user.email || ''
          const projectId = getOrCreateProjectId(session.user.id, email)
          
          // Check if user just upgraded
          if (searchParams?.get('upgraded') === '1') {
            localStorage.setItem('feedkit_is_paid', 'true')
          }
          
          router.replace(`/app/${projectId}`)
        } else {
          // No session, redirect to sign in
          router.replace('/sign-in')
        }
      } else {
        // Fallback for development
        router.replace('/sign-in')
      }
    }

    handleCallback()
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto mb-4"></div>
        <p className="text-gray-600">Signing you in...</p>
      </div>
    </div>
  )
}

