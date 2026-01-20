import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { revalidatePath } from 'next/cache'

const writeClient = createClient({
  projectId: '1rztdp97',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export async function POST(request: NextRequest) {
  if (!process.env.SANITY_API_TOKEN) {
    return NextResponse.json(
      { error: 'Server configuration error', details: 'SANITY_API_TOKEN is not set' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { galleryId, photoKeys } = body

    if (!galleryId || !photoKeys || !Array.isArray(photoKeys)) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Fetch current gallery
    const gallery = await writeClient.fetch(`*[_id == $galleryId][0]`, { galleryId })
    
    if (!gallery || !gallery.photos) {
      return NextResponse.json(
        { error: 'Gallery not found' },
        { status: 404 }
      )
    }

    // Reorder photos based on the provided order
    const reorderedPhotos = photoKeys
      .map((key: string) => gallery.photos.find((p: any) => p._key === key))
      .filter(Boolean)

    // Update gallery with reordered photos
    await writeClient
      .patch(galleryId)
      .set({ photos: reorderedPhotos })
      .commit()

    // Revalidate the gallery page
    revalidatePath('/gallery')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Reorder error:', error)
    return NextResponse.json(
      { error: 'Failed to reorder photos', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
