import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const KEY = process.env.AUTH_TOKEN_KEY || ''
if (!KEY) {
  throw new Error('Missing AUTH_TOKEN_KEY')
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get(KEY)
  console.log({ token })

  // TODO: validate token.
  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/protected'],
}
