import type { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods, auth } from 'lib/api/middleware'
import { PublicUser } from 'lib/models/user-schema'
import { AppError } from 'lib/errors'

type RespPayload = { user: PublicUser } | AppError

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  res.status(200).json({ user: req.user })
}

export default allowMethods(auth(handler), ['GET'])
