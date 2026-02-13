/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["localhost", "blob.v0.dev"],
    unoptimized: true,
  },
  // Ensure static export is NOT enabled for dynamic features
  // trailingSlash: false,
  // generateStaticParams: false,
}

module.exports = nextConfig
