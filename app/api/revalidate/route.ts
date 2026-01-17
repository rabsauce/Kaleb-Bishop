import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * On-demand revalidation API route for Sanity webhooks
 * 
 * This endpoint allows Sanity to trigger immediate cache revalidation
 * when gallery content is created, updated, or deleted in Sanity Studio.
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create a GROQ webhook in Sanity:
 *    - Go to: https://sanity.io/manage
 *    - Select your project (1rztdp97)
 *    - Navigate to: API → Webhooks
 *    - Click "Create webhook"
 * 
 * 2. Configure the webhook:
 *    - Name: "Revalidate Gallery"
 *    - URL: https://your-domain.com/api/revalidate
 *      (Use your production domain, or http://localhost:3000/api/revalidate for local testing)
 *    - Dataset: production
 *    - Trigger on: Create, Update, Delete
 *    - Filter: _type == "gallery"
 *    - HTTP method: POST
 *    - API version: 2025-01-01
 * 
 * 3. Add authentication header:
 *    - Header name: Authorization
 *    - Header value: Bearer ${process.env.SANITY_REVALIDATE_SECRET}
 *      (You'll need to set SANITY_REVALIDATE_SECRET in your environment variables)
 * 
 * 4. Set environment variable:
 *    - Create a .env.local file (if it doesn't exist)
 *    - Add: SANITY_REVALIDATE_SECRET=your-secret-key-here
 *    - Use a strong random string (e.g., generate with: openssl rand -base64 32)
 *    - In production (Vercel/Netlify/etc.), add this to your environment variables
 * 
 * 5. Test the webhook:
 *    - Update a gallery document in Sanity Studio
 *    - Check your deployment logs to see if revalidation was triggered
 *    - The gallery page should update within seconds
 */
export async function POST(request: NextRequest) {
  try {
    // Get the secret from the Authorization header
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    const secret = authHeader.replace('Bearer ', '')
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

    if (!expectedSecret) {
      console.error('SANITY_REVALIDATE_SECRET environment variable is not set')
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Validate the secret
    if (secret !== expectedSecret) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Revalidate the gallery page
    revalidatePath('/gallery')
    
    // Optionally, you can also revalidate the home page if it shows gallery content
    // revalidatePath('/')

    return NextResponse.json({ 
      revalidated: true,
      message: 'Gallery page revalidated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error revalidating gallery:', error)
    return NextResponse.json(
      { 
        message: 'Error revalidating gallery',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
