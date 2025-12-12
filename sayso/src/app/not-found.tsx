import Link from 'next/link'
import { BrandLogo } from '@/components/BrandLogo'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm bg-[#2563EB]/10">
            <BrandLogo size={72} />
          </div>
          <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-neutral-700 mb-2">Page not found</h2>
          <p className="text-neutral-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-black text-white hover:bg-neutral-800 transition font-medium"
          >
            Go Home
          </Link>
          <Link
            href="/app/714363294e1e3c"
            className="px-6 py-3 rounded-lg border border-neutral-300 hover:border-neutral-400 transition font-medium"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

