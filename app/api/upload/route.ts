import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

// Create a write-enabled client for uploads
const writeClient = createClient({
  projectId: '1rztdp97',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need to add this to .env.local
})

export async function POST(request: NextRequest) {
  // Optional: Add authentication check here
  // const authHeader = request.headers.get('authorization')
  // if (authHeader !== `Bearer ${process.env.UPLOAD_SECRET}`) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // }
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const alt = (formData.get('alt') as string) || 'Gallery image'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Sanity
    const asset = await writeClient.assets.upload('image', buffer, {
      filename: file.name,
    })

    // Create a gallery document or add to existing gallery
    // First, check if gallery exists
    const existingGallery = await writeClient.fetch(`*[_type == "gallery"][0]`)

    if (existingGallery) {
      // Add photo to existing gallery
      await writeClient
        .patch(existingGallery._id)
        .setIfMissing({ photos: [] })
        .append('photos', [
          {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
            alt: alt,
          },
        ])
        .commit()
    } else {
      // Create new gallery document
      await writeClient.create({
        _type: 'gallery',
        title: 'Photo Gallery',
        photos: [
          {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
            alt: alt,
          },
        ],
      })
    }

    return NextResponse.json({
      success: true,
      url: asset.url,
      assetId: asset._id,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
