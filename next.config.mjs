/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      // Allow api.resona.health/v1/* to reach /api/v1/*
      // This works when api.resona.health is added as a domain in Vercel
      {
        source: "/v1/:path*",
        destination: "/api/v1/:path*",
      },
    ]
  },
  async headers() {
    return [
      {
        // CORS headers for API routes
        source: "/api/v1/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ]
  },
}

export default nextConfig
