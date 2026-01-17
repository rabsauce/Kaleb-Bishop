'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Sparkles, X } from 'lucide-react'

// Flow arts data
const flowReel = {
  url: 'https://vimeo.com/1145475132?fl=ip&fe=ec',
  type: 'vimeo' as const,
}

// Flow gallery images
interface FlowGalleryImage {
  id: string
  src: string
  alt: string
}

const flowGalleryImages: FlowGalleryImage[] = [
  {
    id: '1',
    src: '/images/flow_gallery/IMG_2943.jpg',
    alt: 'Kaleb Bishop - Fire flow performance with Poi',
  },
  {
    id: '2',
    src: '/images/flow_gallery/IMG_8893.jpg',
    alt: 'Kaleb Bishop - LED Dragonstaff performance',
  },
]

const flowSpecialties = [
  {
    name: 'Poi',
    description: 'Fire and LED poi spinning',
    icon: '🔥',
  },
  {
    name: 'Dragonstaff',
    description: 'Fire and LED dragonstaff manipulation',
    icon: '🐉',
  },
  {
    name: 'Flow Arts',
    description: 'Various fire and LED flow props',
    icon: '✨',
  },
]

const performanceTypes = [
  {
    title: 'Music Festivals',
    description: 'High-energy performances for festival audiences',
  },
  {
    title: 'Private Events',
    description: 'Customized performances for private celebrations',
  },
  {
    title: 'Corporate Events',
    description: 'Professional entertainment for corporate gatherings',
  },
]

// Extract video ID from Vimeo URL
const getVimeoId = (url: string): string => {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match ? match[1] : ''
}

export default function FlowPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const videoId = getVimeoId(flowReel.url)
  const embedUrl = videoId
    ? `https://player.vimeo.com/video/${videoId}?autoplay=0&muted=0&loop=0&title=0&portrait=0&byline=0&responsive=1&dnt=1`
    : ''

  return (
    <>
      <div className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            <source src="/sparks.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header - Fiery Aesthetic */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 space-medium"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]">
              Flow Arts
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Fire and LED flow arts performer specializing in Poi and Dragonstaff. Available for
              music festivals, private events, and corporate entertainment.
            </p>
          </motion.div>

          {/* Main Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-12 max-w-5xl mx-auto"
          >
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-[0_0_60px_rgba(255,69,0,0.3)]">
              <img
                src="/images/flowpage.JPG"
                alt="Kaleb Bishop - Flow Arts Performance"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
            </div>
          </motion.div>

          {/* Flow Reel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 text-center">
              Flow Reel
            </h2>
            <div className="relative w-full max-w-5xl mx-auto aspect-video bg-black rounded-lg overflow-hidden shadow-[0_0_60px_rgba(255,69,0,0.3)] flame-hover">
              {embedUrl ? (
                  <iframe
                      src={embedUrl}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                      style={{ border: 'none' }}
                      title="Kaleb Bishop Flow Arts Reel"
                    />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-center">
                    <Flame className="w-12 h-12 text-accent-red mx-auto mb-3" />
                    <p className="text-gray-400">Flow reel video</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Live Performance Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 text-center">
              Live Performance Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {flowGalleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative w-full aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Flame className="w-10 h-10 text-red-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Specialties */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 text-center">
              Specialties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {flowSpecialties.map((specialty, index) => (
                <motion.div
                  key={specialty.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="bg-gradient-to-br from-gray-900 via-gray-900 to-black border-2 border-orange-500/30 rounded-xl px-8 py-4 text-center hover:border-orange-500 hover:shadow-[0_0_25px_rgba(255,69,0,0.4)] transition-all duration-200 flame-hover"
                >
                  <div className="text-3xl mb-2">{specialty.icon}</div>
                  <h3 className="text-lg font-display font-bold text-orange-400 mb-1">
                    {specialty.name}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{specialty.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Performance Types */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 text-center">
              Available For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {performanceTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500/30 rounded-xl p-6 hover:border-red-500 hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] transition-all duration-200 flame-hover"
                >
                  <h3 className="text-xl font-display font-bold text-red-400 mb-3">
                    {type.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{type.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Booking CTA - Fiery Energy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center bg-gradient-to-br from-gray-900 via-red-950/30 to-orange-950/20 border-2 border-orange-500/40 rounded-2xl p-10 max-w-3xl mx-auto shadow-[0_0_50px_rgba(255,69,0,0.25)] flame-hover"
          >
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-400">
              Book a Performance
            </h3>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
              Interested in booking a fire or LED flow arts performance for your event? Get in
              touch to discuss custom performances tailored to your venue and audience.
            </p>
            <a
              href="/contact"
              className="inline-block px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-xl hover:from-orange-600 hover:to-red-600 hover:shadow-[0_0_30px_rgba(255,69,0,0.6)] transition-all duration-200 hover:scale-105 hover-lift"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal for Flow Gallery */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-accent-blue transition-colors"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={flowGalleryImages[selectedImage].src}
                alt={flowGalleryImages[selectedImage].alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <p className="text-white text-center mt-4 text-sm">
                {flowGalleryImages[selectedImage].alt}
              </p>
            </motion.div>

            {/* Navigation */}
            {flowGalleryImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(
                      selectedImage > 0 ? selectedImage - 1 : flowGalleryImages.length - 1
                    )
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent-blue transition-colors text-2xl font-bold"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(
                      selectedImage < flowGalleryImages.length - 1 ? selectedImage + 1 : 0
                    )
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent-blue transition-colors text-2xl font-bold"
                  aria-label="Next"
                >
                  ›
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}