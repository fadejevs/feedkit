"use client"
import React from 'react'

export function UpsellModal({
  open,
  onClose,
  onPrimary,
  title = 'Create a free account to continue',
  description = 'You\'ve reached the guest limit. Sign up to unlock unlimited transcriptions, faster processing, and more.',
  primaryText = 'Continue with Email',
  secondaryText = 'Maybe later',
}: {
  open: boolean
  onClose: () => void
  onPrimary: () => void
  title?: string
  description?: string
  primaryText?: string
  secondaryText?: string
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-md sm:rounded-2xl sm:shadow-2xl p-6 sm:p-8 border-t sm:border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center">⚡</div>
          <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-neutral-600 mb-6">{description}</p>
        <ul className="text-sm text-neutral-700 mb-6 space-y-2">
          <li className="flex items-center gap-2"><span>✅</span> Faster and more accurate transcripts</li>
          <li className="flex items-center gap-2"><span>✅</span> Unlimited projects and exports</li>
          <li className="flex items-center gap-2"><span>✅</span> EU-first privacy & retention controls</li>
        </ul>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button onClick={onPrimary} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-black text-white hover:bg-neutral-800 transition text-sm font-medium">{primaryText}</button>
          <button onClick={onClose} className="w-full sm:w-auto px-4 py-2 rounded-lg border border-neutral-300 hover:border-neutral-400 transition text-sm font-medium">{secondaryText}</button>
        </div>
      </div>
    </div>
  )
}



