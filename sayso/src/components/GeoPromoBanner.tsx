"use client"
import React from 'react'
import { useGeoPromo } from '@/hooks/useGeoPromo'

export function GeoPromoBanner() {
  const { geo, loading, promoCode, discount } = useGeoPromo()

  if (loading || !geo) return null

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 sm:py-3 px-4 sm:px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
      <p className="relative text-xs sm:text-sm font-medium">
        <span className="font-bold">{discount} OFF subscriptions</span> for users in {geo.country} {geo.flag} — Use code{' '}
        <span className="inline-block px-2 py-0.5 rounded bg-white/20 font-mono font-bold">{promoCode}</span> at checkout.
      </p>
    </div>
  )
}

