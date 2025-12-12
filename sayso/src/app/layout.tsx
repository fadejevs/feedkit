import './globals.css'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://feedkit.co'),
  title: {
    default: 'Feedkit — A better way to collect customer feedback',
    template: '%s · Feedkit',
  },
  description: 'Capture, organize, and announce product feedback in one place. Feedback boards, public roadmaps, announcements, and surveys.',
  keywords: ['customer feedback', 'product feedback', 'feedback boards', 'roadmap', 'announcements', 'surveys', 'product management'],
  authors: [{ name: 'Feedkit' }],
  creator: 'Feedkit',
  publisher: 'Feedkit',
  applicationName: 'Feedkit',
  openGraph: {
    type: 'website',
    url: 'https://feedkit.co',
    title: 'Feedkit — A better way to collect customer feedback',
    description: 'Capture, organize, and announce product feedback in one place.',
    siteName: 'Feedkit',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Feedkit — Collect customer feedback' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Feedkit — A better way to collect customer feedback',
    description: 'Capture, organize, and announce product feedback in one place.',
    images: ['/og.jpg'],
    creator: '@feedkit',
  },
  alternates: {
    canonical: 'https://feedkit.co',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <meta name="theme-color" content="#2563EB" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          </head>
      <body className={`${inter.className} min-h-screen antialiased` }>
        {children}
      </body>
    </html>
  )
}


