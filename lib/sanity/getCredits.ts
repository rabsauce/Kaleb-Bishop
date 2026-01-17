import { client } from '@/sanity/lib/client'
import { creditsQuery } from './queries'
import { credits as fallbackCredits } from '@/data/credits'

// Helper to get credits from Sanity, with fallback to static data
export async function getCredits() {
  try {
    const sanityCredits = await client.fetch(creditsQuery)
    
    if (sanityCredits && sanityCredits.length > 0) {
      // Transform Sanity data to match our credit structure
      return sanityCredits.map((credit: any) => ({
        year: credit.year,
        project: credit.project,
        role: credit.role,
        type: credit.type,
        director: credit.director,
        coordinator: credit.coordinator,
        notes: credit.notes,
        highlight: credit.highlight || false,
      }))
    }
  } catch (error) {
    console.error('Error fetching credits from Sanity:', error)
  }
  
  // Fallback to static data if Sanity fails or no data
  return fallbackCredits
}