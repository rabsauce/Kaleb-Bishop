import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'

const galleryQuery = groq`*[_type == "gallery"][0]{
  _id,
  title,
  photos[]{
    _key,
    alt,
    caption,
    asset {
      _ref,
      _type
    }
  }
}`

export async function GET() {
  try {
    const gallery = await client.fetch(galleryQuery)
    return NextResponse.json(gallery || { photos: [] })
  } catch (error) {
    console.error('Error fetching gallery:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery' },
      { status: 500 }
    )
  }
}
