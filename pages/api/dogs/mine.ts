import { ApiRequest, ApiResponse } from 'lib/api/types'
import { AppError } from 'lib/errors'
import { allowMethods } from 'lib/api/middleware'
import { sendError } from 'lib/api/err-response'
import { fetchByCreator } from 'lib/models/dog'
import { Dog } from 'lib/models/dog-schema'

type RespPayload = Dog[] | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const userId = String(req.query.sub)
    const dogs = await fetchByCreator(userId)
    res.status(200).json(dogs)
  } catch (err) {
    sendError(res, err)
  }
}

export default allowMethods(handler, ['GET'])
