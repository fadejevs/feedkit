import { FeedbackWidget } from '@/components/FeedbackWidget'

export default function WidgetPage() {
  // This page can be used as an iframe embed or standalone widget
  return (
    <div className="min-h-screen bg-transparent">
      <FeedbackWidget position="bottom-right" />
    </div>
  )
}

