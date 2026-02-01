/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'theimperiumcbd.com' },
      { protocol: 'https', hostname: 'www.beautymarket.es' },
      { protocol: 'https', hostname: 'moosesmokeshop.com' },
    ],
  },
}

export default nextConfig
