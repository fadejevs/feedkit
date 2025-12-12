"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useSearchParams } from 'next/navigation'
import { getOrCreateProjectId } from '@/lib/projectId'

export type User = {
  id: string
  email: string
  name?: string
  avatar?: string
  isPaid?: boolean
  projectId?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const startTime = Date.now()
    
    // Check if user just upgraded
    if (searchParams?.get('upgraded') === '1') {
      localStorage.setItem('feedkit_is_paid', 'true')
    }

    // Check Supabase session
    if (supabase) {
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        if (session?.user) {
          const isPaid = localStorage.getItem('feedkit_is_paid') === 'true'
          const email = session.user.email || ''
          const projectId = getOrCreateProjectId(session.user.id, email)
          setUser({
            id: session.user.id,
            email,
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
            avatar: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture,
            isPaid,
            projectId,
          })
        } else {
          // Check localStorage fallback for mock auth
          const mockAuth = localStorage.getItem('sayso_auth')
          if (mockAuth) {
            try {
              const data = JSON.parse(mockAuth)
              const isPaid = localStorage.getItem('feedkit_is_paid') === 'true'
              const email = data.email || 'guest@example.com'
              const userId = 'local-user'
              const projectId = getOrCreateProjectId(userId, email)
              setUser({
                id: userId,
                email,
                isPaid,
                projectId,
              })
            } catch {}
          }
        }
        
        // Ensure minimum loading time of 500ms to prevent flash
        const elapsed = Date.now() - startTime
        const delay = Math.max(0, 500 - elapsed)
        await new Promise(resolve => setTimeout(resolve, delay))
        
        setLoading(false)
      })

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const isPaid = localStorage.getItem('feedkit_is_paid') === 'true'
          const email = session.user.email || ''
          const projectId = getOrCreateProjectId(session.user.id, email)
          setUser({
            id: session.user.id,
            email,
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
            avatar: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture,
            isPaid,
            projectId,
          })
        } else {
          setUser(null)
        }
      })

      return () => subscription.unsubscribe()
    } else {
      // Fallback for local development
      const mockAuth = localStorage.getItem('sayso_auth')
      if (mockAuth) {
        try {
          const data = JSON.parse(mockAuth)
          const isPaid = localStorage.getItem('feedkit_is_paid') === 'true'
          const email = data.email || 'guest@example.com'
          const userId = 'local-user'
          const projectId = getOrCreateProjectId(userId, email)
          setUser({
            id: userId,
            email,
            isPaid,
            projectId,
          })
        } catch {}
      }
      
      // Ensure minimum loading time of 500ms to prevent flash
      const elapsed = Date.now() - startTime
      const delay = Math.max(0, 500 - elapsed)
      setTimeout(() => setLoading(false), delay)
    }
  }, [searchParams])

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
    localStorage.removeItem('sayso_auth')
    localStorage.removeItem('feedkit_is_paid')
    localStorage.removeItem('capre_is_paid') // Remove old key for cleanup
    setUser(null)
  }

  return { user, loading, signOut }
}

