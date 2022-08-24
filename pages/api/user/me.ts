import type { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware'
import { find } from 'lib/models/user'
import { PublicUser } from 'lib/models/user-schema'
import { AppError } from 'lib/errors'

type RespPayload = { user: PublicUser } | AppError

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  const userId = String(req.query.sub)
  const user = await find(userId)
  res.status(200).json({ user })
}

export default allowMethods(handler, ['GET'])
