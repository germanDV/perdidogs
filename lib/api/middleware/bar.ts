import type { Middleware } from 'lib/api/types'

export const barMdw: Middleware = (handler) => {
  return (req, res) => {
    req.bar = true
    return handler(req, res)
  }
}
