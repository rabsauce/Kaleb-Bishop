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

export async function DELETE(request: NextRequest) {
  if (!process.env.SANITY_API_TOKEN) {
    return NextResponse.json(
      { error: 'Server configuration error', details: 'SANITY_API_TOKEN is not set' },
      { status: 500 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const photoKey = searchParams.get('key')
    const galleryId = searchParams.get('galleryId')

    if (!photoKey || !galleryId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Fetch current gallery to find the photo index
    const gallery = await writeClient.fetch(`*[_id == $galleryId][0]`, { galleryId })
    
    if (!gallery || !gallery.photos) {
      return NextResponse.json(
        { error: 'Gallery not found' },
        { status: 404 }
      )
    }

    // Find photo by _key or asset._ref
    const photoToDelete = gallery.photos.find((p: any) => 
      p._key === photoKey || (!p._key && p.asset?._ref === photoKey)
    )

    if (!photoToDelete) {
      console.error('Photo not found:', { photoKey, photos: gallery.photos.map((p: any) => ({ _key: p._key, assetRef: p.asset?._ref })) })
      return NextResponse.json(
        { error: 'Photo not found', details: `Photo with key "${photoKey}" not found in gallery` },
        { status: 404 }
      )
    }

    // Remove the photo - use unset if it has _key, otherwise filter and set
    if (photoToDelete._key) {
      // Use unset for photos with _key
      await writeClient
        .patch(galleryId)
        .unset([`photos[_key=="${photoToDelete._key}"]`])
        .commit()
    } else {
      // For photos without _key, filter and set the array
      const updatedPhotos = gallery.photos.filter((p: any) => 
        p.asset?._ref !== photoKey
      )
      
      await writeClient
        .patch(galleryId)
        .set({ photos: updatedPhotos })
        .commit()
    }

    // Revalidate the gallery page
    revalidatePath('/gallery')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete photo', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
