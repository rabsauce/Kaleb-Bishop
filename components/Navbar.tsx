'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Instagram } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '@/data/profile'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/reel', label: 'Reel' },
  { href: '/credits', label: 'Credits' },
  { href: '/flow', label: 'Flow' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-accent-blue/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl lg:text-3xl font-display font-bold text-accent-blue hover:text-accent-blue-dark transition-colors"
            >
              Kaleb Bishop
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                const isFlow = link.href === '/flow'
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-2 text-sm lg:text-base font-medium transition-colors ${
                      isActive
                        ? isFlow
                          ? 'text-red-500'
                          : 'text-accent-blue'
                        : isFlow
                        ? 'text-red-500/80 hover:text-red-500'
                        : 'text-gray-300 hover:text-accent-blue'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                          isFlow ? 'bg-red-500' : 'bg-accent-blue'
                        }`}
                        layoutId="navbar-indicator"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                )
              })}
              {/* Social Icons */}
              <div className="flex items-center space-x-4 ml-2">
                {profile.contact.social.instagram && (
                  <a
                    href={profile.contact.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-accent-blue transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {profile.contact.social.imdb && (
                  <a
                    href={profile.contact.social.imdb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 text-sm lg:text-base font-display font-bold text-white hover:text-accent-blue transition-colors"
                    aria-label="IMDb"
                  >
                    IMDb
                  </a>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-300 hover:text-accent-blue transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-black/95 backdrop-blur-md border-b border-accent-blue/20"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                const isFlow = link.href === '/flow'
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? isFlow
                          ? 'text-red-500 bg-red-500/10'
                          : 'text-accent-blue bg-accent-blue/10'
                        : isFlow
                        ? 'text-red-500/80 hover:text-red-500 hover:bg-red-500/5'
                        : 'text-gray-300 hover:text-accent-blue hover:bg-accent-blue/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}