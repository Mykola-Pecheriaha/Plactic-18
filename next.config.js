/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  }
}

module.exports = nextConfig 