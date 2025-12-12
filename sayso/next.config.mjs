/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'logo.clearbit.com' },
      { protocol: 'https', hostname: 'unavatar.io' },
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
}

export default nextConfig


