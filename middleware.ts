import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Just validates token existence,
 * proper token validation takes place in API endpoints
 */
export function middleware(req: NextRequest) {
  const KEY = process.env.AUTH_COOKIE_KEY || ''
  const token = req.cookies.get(KEY)
  if (!KEY || !token) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile'],
}
