import type { ApiHandler, ApiRequest, ApiResponse } from 'lib/api/types'

export const allowMethods = (handler: ApiHandler, methods: string[]) => {
  return (req: ApiRequest, res: ApiResponse) => {
    if (!methods.includes(req.method || '')) {
      res.setHeader('Allow', methods.join(', '))
      res.status(405).json({ message: `Método ${req.method} no permitido.` })
      return
    }

    return handler(req, res)
  }
}
