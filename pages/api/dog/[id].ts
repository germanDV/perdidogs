import { Dog, fetchById } from 'lib/models/dog'
import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware/allow-methods'
import { AppError } from 'lib/errors'

type RespPayload = Dog | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  const {
    query: { id },
  } = req

  try {
    const dog = await fetchById(Number(id))
    if (!dog) {
      res.status(404).json({
        name: 'NotFound',
        message: `Perr@ con ID ${id} no encontrado.`,
      })

      return
    }
    res.status(200).json(dog)
  } catch (err) {
    const error = err as AppError
    const code = error.code || 500
    res.status(code).json({
      name: error.name || 'InternalServer',
      message: error.message,
    })
  }
}

export default allowMethods(handler, ['GET', 'HEAD'])
