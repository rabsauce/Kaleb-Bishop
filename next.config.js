/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'cdn.sanity.io'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig