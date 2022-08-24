import { fetchById } from 'lib/models/dog'
import { Dog } from 'lib/models/dog-schema'
import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware'
import { sendError } from 'lib/api/err-response'
import { AppError } from 'lib/errors'

type RespPayload = Dog | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const dog = await fetchById(String(req.query.id))
    res.status(200).json(dog)
  } catch (err) {
    sendError(res, err)
  }
}

export default allowMethods(handler, ['GET'])
