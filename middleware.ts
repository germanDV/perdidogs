import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'lib/auth/token'

const KEY = process.env.AUTH_COOKIE_KEY || ''
const PROTO = process.env.NEXT_PUBLIC_PROTO || ''
const HOST = process.env.NEXT_PUBLIC_HOST || ''

const redirectionURL = `${PROTO}://${HOST}/ingresar`

export async function middleware(req: NextRequest & { sub: string }) {
  const token = req.cookies.get(KEY)
  if (!token) {
    return NextResponse.redirect(redirectionURL)
  }

  try {
    const claims = (await verify(token)) as { sub: string }
    const url = req.nextUrl
    url.searchParams.append('sub', claims.sub)
    return NextResponse.rewrite(url)
  } catch (err) {
    return NextResponse.redirect(redirectionURL)
  }
}

export const config = {
  matcher: [
    '/reportes',
    '/nuevo',
    '/api/user/contact',
    '/api/user/me',
    '/api/dogs/mine',
    '/api/dogs/new',
    '/api/dogs/update/:id*',
    '/api/dogs/delete/:id*',
  ],
}
