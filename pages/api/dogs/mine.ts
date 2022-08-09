import { ApiRequest, ApiResponse } from 'lib/api/types'
import { AppError } from 'lib/errors'
import { allowMethods, auth } from 'lib/api/middleware'
import { fetchByCreator } from 'lib/models/dog'
import { Dog } from 'lib/models/dog-schema'

type RespPayload = Dog[] | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const dogs = await fetchByCreator(req.user._id)
    res.status(200).json(dogs)
  } catch (err) {
    const error = err as AppError
    const code = error.code || 500
    res.status(code).json({
      name: error.name || 'InternalServer',
      message: error.message,
    })
  }
}

export default allowMethods(auth(handler), ['GET'])
