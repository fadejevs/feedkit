"use client"

import { Suspense, useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { FeedbackWidget } from '@/components/FeedbackWidget'

function WidgetContent() {
  const searchParams = useSearchParams()
  const [widgetSettings, setWidgetSettings] = useState<{ accentColor: string; customLogo: string | null; position: string } | null>(null)

  const projectId = searchParams.get('projectId') || undefined

  const position = useMemo(() => {
    const pos = (searchParams.get('pos') || widgetSettings?.position || 'bottom-right') as
      | 'bottom-right'
      | 'bottom-left'
      | 'top-right'
      | 'top-left'
    if (['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(pos)) {
      return pos
    }
    return 'bottom-right'
  }, [searchParams, widgetSettings])

  useEffect(() => {
    if (projectId) {
      fetch(`/api/widget-settings/${projectId}`)
        .then(res => res.json())
        .then(data => {
          if (data.settings) {
            setWidgetSettings({
              accentColor: data.settings.accent_color || '#F97316',
              customLogo: data.settings.custom_logo || null,
              position: data.settings.position || 'bottom-right',
            })
          }
        })
        .catch(err => console.error('Failed to load widget settings:', err))
    }
  }, [projectId])

  return (
    <div className="min-h-screen bg-transparent">
      <FeedbackWidget 
        position={position} 
        projectId={projectId}
        accentColor={widgetSettings?.accentColor}
        customLogo={widgetSettings?.customLogo}
      />
    </div>
  )
}

export default function WidgetPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-transparent">
        <FeedbackWidget />
      </div>
    }>
      <WidgetContent />
    </Suspense>
  )
}

