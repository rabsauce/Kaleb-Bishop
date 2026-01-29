'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, Award, ChevronDown } from 'lucide-react'
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

  const compactStats = `${profile.stats.yearsActive}+ Years • ${profile.stats.credits}+ Credits • ${profile.stats.specialties}+ Specialties • ${profile.stats.height} • ${profile.stats.weight}`

  return (
    <section className="relative md:min-h-screen md:flex md:items-end md:justify-center md:overflow-hidden">
      {/* Background Video: fixed on mobile (scroll-over), absolute on desktop */}
      <div className="fixed inset-0 z-0 h-screen w-screen md:absolute md:inset-0 md:h-full md:w-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full opacity-60 object-cover"
        >
          <source src="/opener.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
      </div>

      {/* Desktop: unchanged layout */}
      <div className="hidden md:block relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-accent-blue mb-6 font-medium tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {profile.tagline}
            </motion.p>
            <motion.p
              className="max-w-3xl mx-auto text-gray-300 text-lg md:text-xl mb-8 leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {profile.bio}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
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
            <motion.div
              className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-blue mb-2">{profile.stats.yearsActive}+</div>
                <div className="text-gray-400 text-sm md:text-base">Years Active</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-blue mb-2">{profile.stats.credits}+</div>
                <div className="text-gray-400 text-sm md:text-base">Credits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-blue mb-2">{profile.stats.specialties}+</div>
                <div className="text-gray-400 text-sm md:text-base">Specialties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-blue mb-2">{profile.stats.height}</div>
                <div className="text-gray-400 text-sm md:text-base">Height</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-blue mb-2">{profile.stats.weight}</div>
                <div className="text-gray-400 text-sm md:text-base">Weight</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: video-first hero + scroll-for-more block */}
      <div className="md:hidden relative z-10">
        <div className="min-h-screen flex flex-col justify-end items-center text-center px-4 pb-8 pt-24">
          <motion.p
            className="text-lg text-accent-blue font-medium tracking-wide mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {profile.tagline}
          </motion.p>
          <motion.div
            className="mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Link
              href="/reel"
              className="inline-flex items-center gap-2 px-8 py-3 bg-accent-blue text-black font-semibold text-base rounded-lg hover:bg-accent-blue-dark transition-all duration-200"
            >
              <Play className="w-4 h-4" />
              <span>Watch Reel</span>
            </Link>
          </motion.div>
          <motion.p
            className="text-gray-400 text-xs sm:text-sm max-w-sm mx-auto mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            {compactStats}
          </motion.p>
          <motion.a
            href="#hero-more"
            className="text-gray-500 hover:text-accent-blue transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            aria-label="Scroll for more"
          >
            <ChevronDown className="w-8 h-8 mx-auto" />
          </motion.a>
        </div>

        <div
          id="hero-more"
          className="px-4 py-12 bg-gradient-to-b from-black/85 to-black"
        >
          <p className="max-w-xl mx-auto text-gray-300 text-base leading-relaxed mb-8">
            {profile.bio}
          </p>
          <div className="flex justify-center mb-10">
            <Link
              href="/credits"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-accent-blue text-accent-blue font-semibold text-base rounded-lg hover:bg-accent-blue hover:text-black transition-all duration-200"
            >
              <Award className="w-4 h-4" />
              <span>View Credits</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="text-center py-3 rounded-lg bg-black/40">
              <div className="text-xl font-bold text-accent-blue">{profile.stats.yearsActive}+</div>
              <div className="text-gray-400 text-xs">Years Active</div>
            </div>
            <div className="text-center py-3 rounded-lg bg-black/40">
              <div className="text-xl font-bold text-accent-blue">{profile.stats.credits}+</div>
              <div className="text-gray-400 text-xs">Credits</div>
            </div>
            <div className="text-center py-3 rounded-lg bg-black/40">
              <div className="text-xl font-bold text-accent-blue">{profile.stats.specialties}+</div>
              <div className="text-gray-400 text-xs">Specialties</div>
            </div>
            <div className="text-center py-3 rounded-lg bg-black/40">
              <div className="text-xl font-bold text-accent-blue">{profile.stats.height}</div>
              <div className="text-gray-400 text-xs">Height</div>
            </div>
            <div className="text-center py-3 rounded-lg bg-black/40 col-span-2">
              <div className="text-xl font-bold text-accent-blue">{profile.stats.weight}</div>
              <div className="text-gray-400 text-xs">Weight</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}