/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true
  },
  images: {
    domains: ['localhost', 'plactic-18.vercel.app'],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig 