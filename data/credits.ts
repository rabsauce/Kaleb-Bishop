// Filmography / Credits data for Kaleb Bishop
// https://www.imdb.com/name/nm9121737/

export interface Credit {
  year: number
  project: string
  role: 'Stunt Performer' | 'Stunt Double' | 'Stunt Coordinator' | 'Stunt Driver' | 'Specialty Stunt' | 'Stunt Previs' | 'Utility Stunts' | 'Actor' | 'Location Management' | 'Location Manager' | 'Assistant Location Manager'
  director?: string
  coordinator?: string
  notes?: string
  type: 'Feature Film' | 'TV Series' | 'Streaming' | 'Commercial' | 'Music Video' | 'Short' | 'TV Movie'
  highlight?: boolean // For featuring notable work
  image?: string // Image path for featured work
}

export const credits: Credit[] = [
  // Stunts
  {
    year: 2025,
    project: 'The Waterfront',
    role: 'Stunt Double: Tony Demil',
    coordinator: 'John Copeman',
    notes: '3 episodes',
    type: 'TV Series',
    highlight: true,
    image: '/images/thewaterfront2-ZSmxatLYYG9BkpNot5vC0UosuKnP9bx7WDMu.jpg',
  },
  {
    year: 2025,
    project: 'Hold the Fort',
    role: 'Utility Stunts',
    coordinator: 'Ryan Monolopolus',
    notes: 'Stunt previsualization work',
    type: 'Feature Film',
    highlight: true,
    image: '/images/holdthefort2.jpeg',
  },
  {
    year: 2025,
    project: 'Souls of Silence',
    role: 'Actor',
    coordinator: 'Ryan Monolopolus',
    notes: 'SOS Guard',
    type: 'Feature Film',
    highlight: true,
    image: '/images/sos2.jpg',
  },
  {
    year: 2025,
    project: 'Bloodletting',
    role: 'Assistant Location Manager',
    coordinator: 'Cayman Eby',
    notes: 'Feature Film',
    type: 'TV Series',
  },
  {
    year: 2024,
    project: 'Found',
    role: 'Assistant Location Manager',
    coordinator: 'Kadesha Williams',
    notes: '22 episodes (2024-2025)',
    type: 'TV Series',
  },
  {
    year: 2024,
    project: 'Them S2',
    role: 'Assistant Location Manager',
    coordinator: 'Kellie Morrison',
    notes: '8 episodes',
    type: 'TV Series',
    highlight: true,
    image: '/images/them2.png',
  },
  {
    year: 2024,
    project: 'The Duel at Bishop Creek',
    role: 'Actor',
    coordinator: 'Airon Armstrong',
    notes: 'Additional Redcoat',
    type: 'Short',
  },
  {
    year: 2023,
    project: 'True Lies',
    role: 'Stunt Performer',
    coordinator: 'Daniel Hargrave',
    notes: 'TV Series, 1 episode',
    type: 'TV Series',
  },
  {
    year: 2022,
    project: 'Killer Mike: RUN',
    role: 'Stunt Performer',
    coordinator: 'James Ortiz',
    notes: 'Music video featuring Dave Chappelle & Young Thug',
    type: 'Music Video',
  },
  {
    year: 2021,
    project: 'Tough Break',
    role: 'Utility Stunts',
    coordinator: 'Ryan Monolopolus',
    notes: 'Short film stunt work',
    type: 'Short',
  },
  {
    year: 2012,
    project: 'Momma & Me',
    role: 'Actor',
    coordinator: 'Marlon Campbell',
    notes: 'Skip Bannigan',
    type: 'TV Movie',
  },
]

// Helper function to get unique years for filtering
export const getUniqueYears = (): number[] => {
  const years = [...new Set(credits.map(credit => credit.year))]
  return years.sort((a, b) => b - a) // Descending order
}

// Helper function to get unique types for filtering
export const getUniqueTypes = (): string[] => {
  return [...new Set(credits.map(credit => credit.type))]
}