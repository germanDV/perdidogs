import type { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods, auth } from 'lib/api/middleware'
import { sendError } from 'lib/api/err-response'
import { PublicUser } from 'lib/models/user-schema'
import { find } from 'lib/models/user'
import { AppError } from 'lib/errors'

type RespPayload = PublicUser | AppError

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const id = String(req.query.id)
    const user = await find(id)
    res.status(200).json(user)
  } catch (err) {
    sendError(res, err)
  }
}

export default allowMethods(auth(handler), ['GET'])
