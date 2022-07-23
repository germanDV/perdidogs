import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware/allow-methods'
import { Dog, save } from 'lib/models/dog'
import { AppError } from 'lib/errors'

type RespPayload = { id: number } | AppError

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const dog: Omit<Dog, '_id'> = req.body
    const id = await save(dog)
    res.status(200).json({ id })
  } catch (err) {
    res.status(500).json({
      name: (err as AppError).name || 'InternalServer',
      message: (err as AppError).message,
    })
  }
}

export default allowMethods(handler, ['POST'])
