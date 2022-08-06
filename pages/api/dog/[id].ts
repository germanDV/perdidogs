import { fetchById } from 'lib/models/dog'
import { Dog } from 'lib/models/dog-schema'
import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware'
import { AppError } from 'lib/errors'

type RespPayload = Dog | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  const {
    query: { id },
  } = req

  try {
    const dog = await fetchById(String(id))
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
