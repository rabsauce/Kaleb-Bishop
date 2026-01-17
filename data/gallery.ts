// Gallery images data
// Replace with actual image URLs when ready
// Using placeholder.com for demo - replace with real images in /public/images/

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: 'headshot' | 'action' | 'onset' | 'burn' | 'crash' | 'wire' | 'driving' | 'combat'
  width: number
  height: number
}

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/gallery/IMG_3765.HEIC.JPEG',
    alt: 'Kaleb Bishop - Professional photo',
    category: 'headshot',
    width: 800,
    height: 1200,
  },
  {
    id: '2',
    src: '/images/gallery/IMG_4243.HEIC',
    alt: 'Kaleb Bishop - Action shot',
    category: 'action',
    width: 1200,
    height: 800,
  },
  {
    id: '3',
    src: '/images/gallery/IMG_4457.jpg',
    alt: 'Kaleb Bishop - On set',
    category: 'onset',
    width: 1200,
    height: 800,
  },
  {
    id: '4',
    src: '/images/gallery/IMG_6812.PNG',
    alt: 'Kaleb Bishop - Professional headshot',
    category: 'headshot',
    width: 800,
    height: 1200,
  },
  {
    id: '5',
    src: '/images/gallery/IMG_7126.JPG',
    alt: 'Kaleb Bishop - Action sequence',
    category: 'action',
    width: 1200,
    height: 800,
  },
  {
    id: '6',
    src: '/images/gallery/kaleb00145-Edit.JPG',
    alt: 'Kaleb Bishop - Stunt performance',
    category: 'action',
    width: 800,
    height: 1200,
  },
  {
    id: '7',
    src: '/images/gallery/kaleb00272-Edit.JPEG',
    alt: 'Kaleb Bishop - Professional headshot',
    category: 'headshot',
    width: 800,
    height: 1200,
  },
]

// For actual implementation, place images in /public/images/ and use:
// src: '/images/gallery/image-name.jpg'