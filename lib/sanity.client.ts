import { createClient } from 'next-sanity'

/**
 * Sanity client configuration for the stunt performer portfolio site
 * 
 * Used for fetching data from Sanity CMS in server components and API routes.
 */
export const client = createClient({
  projectId: '1rztdp97',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true, // Use CDN for faster responses in production
})
