'use client'

import { useEffect, useState } from 'react'
import { Play } from 'lucide-react'
import { profile } from '@/data/profile'

export default function ReelEmbed() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Extract video ID from URL
  const getVideoId = (url: string, type: string): string => {
    if (type === 'vimeo') {
      const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
      return match ? match[1] : ''
    } else {
      const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)
      return match ? match[1] : ''
    }
  }

  const videoId = getVideoId(profile.reel.url, profile.reel.type)
  const embedUrl =
    profile.reel.type === 'vimeo'
      ? `https://player.vimeo.com/video/${videoId}?autoplay=0&muted=0&loop=0&title=1&portrait=0&byline=0`
      : `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0&loop=0&controls=1&modestbranding=1`

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Video Embed Container */}
      <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl">
        <div className="video-container">
          {videoId ? (
            <iframe
              src={embedUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              onLoad={() => setIsLoaded(true)}
              title="Kaleb Bishop Stunt Reel"
            />
          ) : (
            // Placeholder if no valid video URL
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center p-8">
                <Play className="w-16 h-16 text-accent-blue mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Reel video coming soon</p>
                <p className="text-sm text-gray-500">
                  Please update the reel URL in <code className="text-accent-blue">data/profile.ts</code>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Featured Stunts List */}
      {profile.reel.featuredStunts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-6 text-white">
            Featured Stunts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.reel.featuredStunts.map((stunt, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-accent-blue/50 transition-colors"
              >
                <h4 className="text-lg font-semibold text-accent-blue mb-2">{stunt.description}</h4>
                <p className="text-gray-400 text-sm">{stunt.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}