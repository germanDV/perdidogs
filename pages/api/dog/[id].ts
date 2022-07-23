import { Dog, fetchById } from 'lib/models/dog'
import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware/allow-methods'
import { AppError } from 'lib/errors'

type RespPayload = Dog | AppError

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
    res.status(500).json({
      name: (err as AppError).name || 'InternalServer',
      message: (err as AppError).message,
    })
  }
}

export default allowMethods(handler, ['GET', 'HEAD'])
