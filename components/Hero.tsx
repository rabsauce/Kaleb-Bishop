'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, Award } from 'lucide-react'
import { profile } from '@/data/profile'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    // Attempt to load video (placeholder)
    // Replace with actual video source when available
    if (videoRef.current) {
      const handleLoadedData = () => setVideoLoaded(true)
      videoRef.current.addEventListener('loadeddata', handleLoadedData)
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadeddata', handleLoadedData)
        }
      }
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 md:h-full h-screen">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full opacity-60 md:object-cover object-contain"
        >
          <source src="/opener.mp4" type="video/mp4" />
        </video>

        {/* Overlay gradient - adjusted to be lighter at top to show faces */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-64 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {profile.name}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-accent-blue mb-6 font-medium tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {profile.tagline}
          </motion.p>

          <motion.p
            className="max-w-3xl mx-auto text-gray-300 text-lg md:text-xl mb-16 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {profile.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link
              href="/reel"
              className="group relative px-10 py-4 bg-accent-blue text-black font-semibold text-lg rounded-lg overflow-hidden hover:bg-accent-blue-dark transition-all duration-200 flex items-center gap-3 hover:scale-105 hover-lift"
            >
              <Play className="w-5 h-5" />
              <span>Watch Reel</span>
            </Link>

            <Link
              href="/credits"
              className="group px-10 py-4 border-2 border-accent-blue text-accent-blue font-semibold text-lg rounded-lg hover:bg-accent-blue hover:text-black transition-all duration-200 flex items-center gap-3 hover:scale-105 hover-lift"
            >
              <Award className="w-5 h-5" />
              <span>View Credits</span>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-blue mb-2">
                {profile.stats.yearsActive}+
              </div>
              <div className="text-gray-400 text-sm md:text-base">Years Active</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-blue mb-2">
                {profile.stats.credits}+
              </div>
              <div className="text-gray-400 text-sm md:text-base">Credits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-blue mb-2">
                {profile.stats.specialties}+
              </div>
              <div className="text-gray-400 text-sm md:text-base">Specialties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-blue mb-2">
                {profile.stats.height}
              </div>
              <div className="text-gray-400 text-sm md:text-base">Height</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-blue mb-2">
                {profile.stats.weight}
              </div>
              <div className="text-gray-400 text-sm md:text-base">Weight</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-accent-blue rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 bg-accent-blue rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}