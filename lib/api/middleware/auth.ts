import type { ApiHandler, ApiRequest, ApiResponse } from 'lib/api/types'
import { find } from 'lib/models/user'
import { verify } from 'lib/token'

export const auth = (handler: ApiHandler) => {
  return async (req: ApiRequest, res: ApiResponse) => {
    const authHeader = req.headers['authorization'] || ''
    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      res.status(401).send('Invalid authorization header')
      return
    }

    try {
      const token = parts[1]
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
