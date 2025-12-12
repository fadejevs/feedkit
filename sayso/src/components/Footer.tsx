import Link from 'next/link'
import { BrandLogo } from './BrandLogo'

interface FooterProps {
  showProjectId?: boolean
  projectId?: string
}

export function Footer({ showProjectId = false, projectId }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span className="font-medium">Feedkit</span>
            <span>© 2025</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gray-900">Terms of Service</Link>
            <Link href="#" className="hover:text-gray-900">Privacy Policy</Link>
            <span>From Riga with ❤️</span>
          </div>
          <div>
            <BrandLogo size={20} />
          </div>
        </div>
        {showProjectId && projectId && (
          <div className="text-center mt-4 text-xs text-gray-500">
            Project ID: {projectId}
          </div>
        )}
      </div>
    </footer>
  )
}

