"use client"

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { FeedbackWidget } from '@/components/FeedbackWidget'

export default function WidgetPage() {
  const searchParams = useSearchParams()

  const position = useMemo(() => {
    const pos = (searchParams.get('pos') || 'bottom-right') as
      | 'bottom-right'
      | 'bottom-left'
      | 'top-right'
      | 'top-left'
    if (['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(pos)) {
      return pos
    }
    return 'bottom-right'
  }, [searchParams])

  const projectId = searchParams.get('projectId') || undefined

  return (
    <div className="min-h-screen bg-transparent">
      <FeedbackWidget position={position} projectId={projectId} />
    </div>
  )
}

