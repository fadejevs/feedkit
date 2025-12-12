"use client"
import { useCallback, useEffect, useState } from 'react'
import { useSubscription } from './useSubscription'

type UpsellState = {
  isAuthed: boolean
  isSubscribed: boolean
  triesAllowed: number
  triesUsed: number
  triesLeft: number
  variant: 'A' | 'B'
}

const TRIES_ALLOWED = 2  // Free users get 2 tries

export function useUpsell() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [triesUsed, setTriesUsed] = useState(0)
  const [variant, setVariant] = useState<'A' | 'B'>('A')
  const { isSubscribed, loading: subLoading } = useSubscription()

  useEffect(() => {
    setIsAuthed(!!(typeof window !== 'undefined' && localStorage.getItem('sayso_auth')))

    const used = Number(localStorage.getItem('sayso_tries_used') || '0')
    setTriesUsed(Number.isFinite(used) ? used : 0)

    let v = localStorage.getItem('sayso_ab_variant') as 'A' | 'B' | null
    if (v !== 'A' && v !== 'B') {
      v = Math.random() < 0.5 ? 'A' : 'B'
      localStorage.setItem('sayso_ab_variant', v)
    }
    setVariant(v)
  }, [])

  const triesLeft = Math.max(0, TRIES_ALLOWED - triesUsed)

  const canTryMore = useCallback(() => {
    // Subscribed users can always transcribe
    if (isSubscribed) return true
    // Free users have limited tries
    return triesUsed < TRIES_ALLOWED
  }, [isSubscribed, triesUsed])

  const recordTry = useCallback(() => {
    // Don't record tries for subscribed users
    if (isSubscribed) return
    const next = triesUsed + 1
    setTriesUsed(next)
    localStorage.setItem('sayso_tries_used', String(next))
  }, [triesUsed, isSubscribed])

  return {
    isAuthed,
    isSubscribed,
    triesAllowed: TRIES_ALLOWED,
    triesUsed,
    triesLeft,
    variant,
    canTryMore,
    recordTry,
  } satisfies UpsellState & {
    canTryMore: () => boolean
    recordTry: () => void
  }
}


