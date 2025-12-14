import Link from 'next/link'
import { BrandLogo } from './BrandLogo'

interface FooterProps {
  showProjectId?: boolean
  projectId?: string
}

export function Footer({ showProjectId = false, projectId }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 mt-12 sm:mt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left side - Brand */}
          <div className="flex items-center gap-3 text-sm text-gray-600 order-1 sm:order-none">
            <span className="font-medium">Feedkit</span>
            <span className="text-gray-400">© 2025</span>
          </div>
          
          {/* Center - Links centered (absolutely positioned) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-600 order-2 sm:order-none">
            <Link href="#" className="hover:text-gray-900 transition">Terms</Link>
            <Link href="#" className="hover:text-gray-900 transition">Privacy</Link>
            <span className="text-gray-500">Made with ❤️ in Riga</span>
          </div>
          
          {/* Right side - Logo */}
          <div className="order-3 sm:order-none">
            <BrandLogo size={20} />
          </div>
        </div>
        
        {/* Bottom line - Project ID centered */}
        {showProjectId && projectId && (
          <div className="text-center mt-4 text-xs text-gray-500">
            Project ID: {projectId}
          </div>
        )}
      </div>
    </footer>
  )
}
