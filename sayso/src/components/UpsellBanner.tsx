"use client"
import React from 'react'

export function UpsellBanner({
  triesLeft,
  variant,
}: {
  triesLeft: number
  variant: 'A' | 'B'
}) {
  const msg = variant === 'A'
    ? `You have ${triesLeft} trial ${triesLeft === 1 ? 'try' : 'tries'} left.`
    : `Unlock unlimited and faster processing — ${triesLeft} trial ${triesLeft === 1 ? 'try' : 'tries'} left.`
  return (
    <div className="mb-4 sm:mb-6 rounded-lg border border-neutral-200 bg-white p-3 sm:p-4 flex items-center justify-between">
      <p className="text-xs sm:text-sm text-neutral-700">{msg}</p>
      <a href="/sign-in" className="ml-3 inline-block text-xs sm:text-sm px-3 py-1.5 rounded-md bg-black text-white hover:bg-neutral-800">Upgrade</a>
    </div>
  )
}


