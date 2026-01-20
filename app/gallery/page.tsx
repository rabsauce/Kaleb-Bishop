import { groq } from 'next-sanity'
import Image from 'next/image'
import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery | Kaleb Bishop',
  description: 'Professional headshots, action shots, and behind-the-scenes images from film and television productions.',
}

// TypeScript types for the gallery data
interface GalleryPhoto {
  alt: string
  caption?: string
  asset: {
    _ref: string
    _type: 'reference'
  }
}

interface GalleryData {
  title?: string
  photos?: GalleryPhoto[]
}

// GROQ query to fetch gallery data
// Query the image object with asset reference (not dereferenced) for urlFor compatibility
const galleryQuery = groq`*[_type == "gallery"][0]{
  title,
  photos[]{
    alt,
    caption,
    asset
  }
}`

// Revalidate every 10 seconds (ISR - Incremental Static Regeneration)
// This allows new uploads to appear quickly while still benefiting from caching
export const revalidate = 10

export default async function GalleryPage() {
  let gallery: GalleryData | null = null
  let error: string | null = null

  try {
    gallery = await client.fetch<GalleryData>(galleryQuery)
  } catch (err) {
    console.error('Error fetching gallery from Sanity:', err)
    error = 'Failed to load gallery. Please try again later.'
  }

  // Empty state: no gallery found or no photos
  if (!gallery || !gallery.photos || gallery.photos.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-white">
              {gallery?.title || 'Photo Gallery'}
            </h1>
            {error ? (
              <p className="text-xl text-red-400 mt-4">{error}</p>
            ) : (
              <p className="text-xl text-gray-400 mt-4">
                Gallery is empty. Please add photos in Sanity Studio.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  const { title, photos } = gallery

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-white">
            {title || 'Photo Gallery'}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Professional headshots, action shots, and behind-the-scenes images from film and
            television productions.
          </p>
        </div>

        {/* Gallery Grid - Masonry Style */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {photos.map((photo, index) => {
            // Fallback alt text if missing (required for accessibility/SEO)
            const altText = photo.alt || 'Gallery image'
            
            // Build optimized image URL using urlFor helper
            // urlFor can accept the asset reference directly or an image object with asset property
            if (!photo.asset) {
              return null
            }

            // Construct image object for urlFor (needs { asset: { _ref, _type } } structure)
            const imageSource = { asset: photo.asset }
            // Use larger width but maintain aspect ratio - fit to max 1200px width
            const imageUrl = urlFor(imageSource).width(1200).fit('max').url()

            return (
              <div
                key={`${photo.asset?._ref || index}`}
                className="break-inside-avoid mb-4 group relative overflow-hidden rounded-lg"
              >
                <div className="relative w-full">
                  <Image
                    src={imageUrl}
                    alt={altText}
                    width={1200}
                    height={1200}
                    className="w-full h-auto rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 6} // Priority for first 6 images
                    loading={index < 6 ? 'eager' : 'lazy'}
                  />
                </div>
                {/* Caption */}
                {photo.caption && (
                  <p className="text-gray-300 text-sm mt-2 px-2">{photo.caption}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
