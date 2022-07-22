import type { Middleware } from 'lib/api/types'

export const fooMdw: Middleware = (handler) => {
  return (req, res) => {
    req.foo = true
    return handler(req, res)
  }
}
