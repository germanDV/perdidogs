import type { ApiHandler, ApiRequest, ApiResponse } from 'lib/api/types'
import { find } from 'lib/models/user'

export const auth = (handler: ApiHandler) => {
  return async (req: ApiRequest, res: ApiResponse) => {
    try {
      const token = req.headers['authorization'] || ''
      const id = Number(token.split(':')[1])
      const user = await find(id)
      req.user = user
      return handler(req, res)
    } catch (err) {
      res.status(401).end()
      return
    }
  }
}
