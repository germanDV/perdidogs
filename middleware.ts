import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'lib/auth/token'

const KEY = process.env.AUTH_COOKIE_KEY || ''

export async function middleware(req: NextRequest & { sub: string }) {
  const token = req.cookies.get(KEY)
  if (!token) {
    return NextResponse.redirect(new URL('/ingresar', req.url))
  }

  try {
    const claims = (await verify(token)) as { sub: string }
    const url = req.nextUrl
    url.searchParams.append('sub', claims.sub)
    return NextResponse.rewrite(url)
  } catch (err) {
    return NextResponse.redirect(new URL('/ingresar', req.url))
  }
}

export const config = {
  matcher: [
    '/reportes',
    '/nuevo',
    '/api/user/contact',
    '/api/user/me',
    '/api/user/changepass',
    '/api/dogs/mine',
    '/api/dogs/new',
    '/api/dogs/update/:id*',
    '/api/dogs/delete/:id*',
    '/api/pictures/remove',
    '/api/pictures/add',
  ],
}
