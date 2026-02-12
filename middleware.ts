import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // In production (Vercel), x-forwarded-proto is set by the platform
  const proto = request.headers.get('x-forwarded-proto')
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host')

  // Redirect HTTP to HTTPS when we're behind a proxy (Vercel) that indicates HTTP
  if (proto === 'http' && host) {
    const url = request.nextUrl.clone()
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
}
