"use client"
import React from 'react'

export function AuroraBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-30"
           style={{ background: 'radial-gradient( circle at 30% 30%, #60a5fa, transparent 60%)' }} />
      <div className="absolute -top-20 right-[-120px] w-[420px] h-[420px] rounded-full blur-3xl opacity-30"
           style={{ background: 'radial-gradient( circle at 70% 30%, #a78bfa, transparent 60%)' }} />
      <div className="absolute bottom-[-120px] left-1/3 w-[480px] h-[480px] rounded-full blur-3xl opacity-25"
           style={{ background: 'radial-gradient( circle at 40% 60%, #34d399, transparent 60%)' }} />
    </div>
  )
}



