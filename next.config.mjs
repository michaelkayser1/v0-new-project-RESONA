/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['three'],
    esmExternals: 'loose'
  },
  transpilePackages: ['three'],
  webpack: (config, { isServer }) => {
    // Handle Three.js on the server side
    if (isServer) {
      config.externals.push({
        'three': 'three'
      })
    }
    return config
  },
  // Ensure proper static export
  output: 'standalone',
}

export default nextConfig
