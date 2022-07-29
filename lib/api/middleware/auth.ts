import type { ApiHandler, ApiRequest, ApiResponse } from 'lib/api/types'
import { find } from 'lib/models/user'
import { verify } from 'lib/token'

const COOKIE_KEY = (process.env.AUTH_COOKIE_KEY = '')

export const auth = (handler: ApiHandler) => {
  return async (req: ApiRequest, res: ApiResponse) => {
    let token = ''

    // Look for auth token in headers, if not present, look in cookies.
    const authHeader = req.headers['authorization'] || ''
    const parts = authHeader.split(' ')
    if (parts.length === 2 || parts[0] === 'Bearer') {
      token = parts[1]
    }

    // No Authorization header, look for token in cookies.
    if (!authHeader) {
      token = req.cookies[COOKIE_KEY] || ''
    }

    if (!token) {
      res.status(401).send('Falta token the autenticación.')
      return
    }

    try {
      const claims = (await verify(token)) as { sub: string }
      const user = await find(claims.sub)
      req.user = user
      return handler(req, res)
    } catch (err) {
      res.status(401).send((err as Error).message)
      return
    }
  }
}
