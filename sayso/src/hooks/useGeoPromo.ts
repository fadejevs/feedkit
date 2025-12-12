"use client"
import { useEffect, useState } from 'react'

type GeoData = {
  country: string
  countryCode: string
  flag: string
}

const PROMO_CODE = 'CAPRE30'
const DISCOUNT = '30%'

export function useGeoPromo() {
  const [geo, setGeo] = useState<GeoData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGeo() {
      try {
        // Use ipapi.co for free geo lookup (no key needed, 1k/day limit)
        const res = await fetch('https://ipapi.co/json/')
        if (!res.ok) throw new Error('Geo fetch failed')
        const data = await res.json()
        setGeo({
          country: data.country_name || 'your country',
          countryCode: data.country_code || 'US',
          flag: data.country_code ? getFlagEmoji(data.country_code) : '🌍',
        })
      } catch {
        // Fallback to US if geo fails
        setGeo({
          country: 'the US',
          countryCode: 'US',
          flag: '🇺🇸',
        })
      } finally {
        setLoading(false)
      }
    }
    fetchGeo()
  }, [])

  return {
    geo,
    loading,
    promoCode: PROMO_CODE,
    discount: DISCOUNT,
  }
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

