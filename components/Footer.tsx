import Link from 'next/link'
import { Instagram, Twitter } from 'lucide-react'
import { profile } from '@/data/profile'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-accent-blue font-display text-xl mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="hover:text-accent-blue transition-colors"
                >
                  {profile.contact.email}
                </a>
              </li>
              <li>{profile.contact.phone}</li>
              {profile.contact.agent && (
                <li className="mt-4">
                  <p className="text-gray-500 text-sm">Agent:</p>
                  <p className="text-gray-300">{profile.contact.agent.name}</p>
                  <a
                    href={`mailto:${profile.contact.agent.email}`}
                    className="text-gray-400 hover:text-accent-blue transition-colors text-sm"
                  >
                    {profile.contact.agent.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-accent-blue font-display text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/reel"
                  className="text-gray-400 hover:text-accent-blue transition-colors"
                >
                  Watch Reel
                </Link>
              </li>
              <li>
                <Link
                  href="/credits"
                  className="text-gray-400 hover:text-accent-blue transition-colors"
                >
                  View Credits
                </Link>
              </li>
              <li>
                <Link
                  href="/flow"
                  className="text-gray-400 hover:text-accent-blue transition-colors"
                >
                  Flow Arts
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-400 hover:text-accent-blue transition-colors"
                >
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-accent-blue transition-colors"
                >
                  Get In Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-accent-blue font-display text-xl mb-4">Connect</h3>
            <div className="flex space-x-4">
              {profile.contact.social.instagram && (
                <a
                  href={profile.contact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent-blue transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              )}
              {profile.contact.social.imdb && (
                <a
                  href={profile.contact.social.imdb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:opacity-80 transition-opacity inline-flex items-center justify-center w-6 h-6 overflow-hidden"
                  aria-label="IMDb"
                >
                  <img
                    src="/images/imdb.jpg"
                    alt="IMDb"
                    className="w-[22px] h-[22px] object-cover object-center scale-110"
                    style={{ filter: 'contrast(1.2)' }}
                  />
                </a>
              )}
              {profile.contact.social.twitter && (
                <a
                  href={profile.contact.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent-blue transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-900 pt-8 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved. | SAG-AFTRA Member
          </p>
        </div>
      </div>
    </footer>
  )
}