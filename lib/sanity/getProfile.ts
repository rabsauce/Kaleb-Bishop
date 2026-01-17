import { client } from '@/sanity/lib/client'
import { profileQuery } from './queries'
import { profile as fallbackProfile } from '@/data/profile'

// Helper to get profile data from Sanity, with fallback to static data
export async function getProfile() {
  try {
    const sanityProfile = await client.fetch(profileQuery)
    
    if (sanityProfile) {
      // Transform Sanity data to match our profile structure
      return {
        name: sanityProfile.name || fallbackProfile.name,
        tagline: sanityProfile.tagline || fallbackProfile.tagline,
        bio: sanityProfile.bio || fallbackProfile.bio,
        stats: sanityProfile.stats || fallbackProfile.stats,
        contact: {
          email: sanityProfile.email || fallbackProfile.contact.email,
          phone: sanityProfile.phone || fallbackProfile.contact.phone,
          agent: sanityProfile.agent || fallbackProfile.contact.agent,
          social: {
            instagram: sanityProfile.instagramUrl || fallbackProfile.contact.social.instagram,
            imdb: sanityProfile.imdbUrl || fallbackProfile.contact.social.imdb,
            twitter: sanityProfile.twitterUrl || fallbackProfile.contact.social.twitter,
          },
        },
        reel: {
          url: sanityProfile.reelUrl || fallbackProfile.reel.url,
          type: 'vimeo' as const,
          featuredStunts: fallbackProfile.reel.featuredStunts, // Keep static for now
        },
      }
    }
  } catch (error) {
    console.error('Error fetching profile from Sanity:', error)
  }
  
  // Fallback to static data if Sanity fails or no data
  return fallbackProfile
}