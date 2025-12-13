"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from './useAuth'

type SubscriptionStatus = {
  isSubscribed: boolean
  status: string | null
  loading: boolean
}

const CACHE_KEY = 'capre_subscription_cache'
const CACHE_TTL = 60 * 1000 // 1 minute
const MIN_LOADING_TIME = 500 // Show loader for at least 500ms

export function useSubscription(): SubscriptionStatus {
  const { user } = useAuth()
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>(() => {
    // Try to load from cache on initial render to prevent flash
    if (typeof window !== 'undefined' && user) {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        try {
          const { isSubscribed, status, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_TTL) {
            return { isSubscribed, status, loading: true } // Still loading, but show cached state
          }
        } catch {}
      }
    }
    return { isSubscribed: false, status: null, loading: true }
  })

  useEffect(() => {
    if (!user || !supabase) {
      setSubscriptionStatus({ isSubscribed: false, status: null, loading: false })
      localStorage.removeItem(CACHE_KEY)
      return
    }

    async function checkSubscription() {
      if (!supabase || !user) {
        setSubscriptionStatus({ isSubscribed: false, status: null, loading: false })
        return
      }
      
      const startTime = Date.now()
      
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('status')
          .eq('user_id', user.id)
          .single()

        if (error) {
          console.error('Error fetching subscription:', error)
          // Ensure minimum loading time of 500ms to prevent flash
          const elapsed = Date.now() - startTime
          const delay = Math.max(0, 500 - elapsed)
          await new Promise(resolve => setTimeout(resolve, delay))
          
          setSubscriptionStatus({ isSubscribed: false, status: null, loading: false })
          localStorage.removeItem(CACHE_KEY)
          return
        }

        const isActive = data?.status === 'active' || data?.status === 'trialing' || data?.status === 'lifetime'
        const result = {
          isSubscribed: isActive,
          status: data?.status || null,
          loading: false,
        }
        
        // Ensure minimum loading time
        const elapsed = Date.now() - startTime
        const delay = Math.max(0, MIN_LOADING_TIME - elapsed)
        await new Promise(resolve => setTimeout(resolve, delay))
        
        setSubscriptionStatus(result)
        
        // Cache the result
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          isSubscribed: isActive,
          status: data?.status || null,
          timestamp: Date.now(),
        }))
      } catch (err) {
        console.error('Error checking subscription:', err)
        // Ensure minimum loading time
        const elapsed = Date.now() - startTime
        const delay = Math.max(0, MIN_LOADING_TIME - elapsed)
        await new Promise(resolve => setTimeout(resolve, delay))
        
        setSubscriptionStatus({ isSubscribed: false, status: null, loading: false })
        localStorage.removeItem(CACHE_KEY)
      }
    }

    checkSubscription()
  }, [user])

  return subscriptionStatus
}

