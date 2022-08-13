import { ApiRequest, ApiResponse } from 'lib/api/types'
import { AppError } from 'lib/errors'
import { allowMethods, auth } from 'lib/api/middleware'
import { sendError } from 'lib/api/err-response'
import { fetchByCreator } from 'lib/models/dog'
import { Dog } from 'lib/models/dog-schema'

type RespPayload = Dog[] | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const dogs = await fetchByCreator(req.user._id)
    res.status(200).json(dogs)
  } catch (err) {
    sendError(res, err)
  }
}

export default allowMethods(auth(handler), ['GET'])
