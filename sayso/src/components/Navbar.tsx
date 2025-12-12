"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'

export function Navbar() {
  const router = useRouter()
  const { user, loading: authLoading, signOut } = useAuth()
  const { isSubscribed, loading: subLoading } = useSubscription()
  const [menuOpen, setMenuOpen] = useState(false)
  const [upgrading, setUpgrading] = useState(false)

  async function handleUpgrade() {
    setUpgrading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error(err)
      setUpgrading(false)
    }
  }

  async function handleBillingPortal() {
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: 'cus_xxx' }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - handwritten style */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#4A7FC7] tracking-tight">
              feedkit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <Link href="#" className="text-sm text-gray-700 hover:text-gray-900 transition flex items-center gap-1">
                Product
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>
            <Link href="#" className="text-sm text-gray-700 hover:text-gray-900 transition">
              Widget
            </Link>
            <Link href="/#pricing" className="text-sm text-gray-700 hover:text-gray-900 transition">
              Pricing
            </Link>
            <Link href="#" className="text-sm text-gray-700 hover:text-gray-900 transition">
              What's new
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            {authLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : user ? (
              <>
                {subLoading ? (
                  <div className="hidden sm:flex items-center justify-center w-24">
                    <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                ) : !isSubscribed ? (
                  <button
                    onClick={handleUpgrade}
                    disabled={upgrading}
                    className="hidden sm:block px-4 py-2 rounded-lg bg-[#4A7FC7] text-white hover:bg-[#3A6BA8] transition text-sm font-medium disabled:opacity-50"
                  >
                    {upgrading ? 'Loading...' : 'Upgrade'}
                  </button>
                ) : null}

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name || user.email} className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#4A7FC7] text-white flex items-center justify-center text-sm font-medium">
                        {(user.name || user.email).charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="hidden sm:inline text-sm font-medium text-gray-700">{user.name || user.email.split('@')[0]}</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {menuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.name || user.email.split('@')[0]}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          {isSubscribed && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-[#4A7FC7] text-xs rounded-full font-medium">
                              Pro
                            </span>
                          )}
                        </div>
                        
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                          onClick={() => setMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        
                        <Link
                          href="/dashboard/transcribe"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                          onClick={() => setMenuOpen(false)}
                        >
                          New Transcript
                        </Link>

                        {isSubscribed ? (
                          <button
                            onClick={() => {
                              setMenuOpen(false)
                              handleBillingPortal()
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                          >
                            Billing
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setMenuOpen(false)
                              handleUpgrade()
                            }}
                            disabled={upgrading}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition text-[#4A7FC7] font-medium"
                          >
                            Upgrade to Pro
                          </button>
                        )}

                        <hr className="my-2" />
                        
                        <button
                          onClick={() => {
                            setMenuOpen(false)
                            signOut()
                            router.push('/')
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition text-red-600"
                        >
                          Sign out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition font-medium"
                >
                  Log In
                </Link>
                <Link
                  href="/dashboard/transcribe"
                  className="px-4 py-2 rounded-lg bg-[#4A7FC7] text-white hover:bg-[#3A6BA8] transition text-sm font-medium"
                >
                  Start for free
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && !user && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <Link href="#" className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              Product
            </Link>
            <Link href="#" className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              Widget
            </Link>
            <Link href="/pricing" className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="#" className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              What's new
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
