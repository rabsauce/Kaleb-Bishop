import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanity.client'
import type { SanityImageSource } from '@sanity/image-url'

/**
 * Image URL builder for Sanity images
 * 
 * Automatically formats images with optimal settings:
 * - Auto format (WebP/AVIF when supported)
 * - Fit: max (maintains aspect ratio, fits within dimensions)
 * 
 * Usage:
 * ```ts
 * const imageUrl = urlFor(photo.asset)
 *   .width(800)
 *   .height(600)
 *   .url()
 * ```
 */
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max')
}
