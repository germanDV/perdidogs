import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const KEY = process.env.AUTH_COOKIE_KEY || ''

/**
 * Just validates token existence,
 * proper token validation takes place in API endpoints
 */
export function middleware(req: NextRequest) {
  const token = req.cookies.get(KEY)
  if (!KEY || !token) {
    return NextResponse.redirect(new URL('/ingresar', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile', '/nuevo'],
}
