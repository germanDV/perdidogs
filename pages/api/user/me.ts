import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware/allow-methods'
import { me, User } from 'lib/models/user'
import { AppError } from 'lib/errors'

type RespPayload = { user: Omit<User, 'pass'> } | AppError

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const token = req.headers['authorization'] || ''
    const user = await me(token)
    res.status(200).json({ user })
  } catch (err) {
    res.status(401).json({
      name: (err as AppError).name || 'InternalServer',
      message: (err as AppError).message,
    })
  }
}

export default allowMethods(handler, ['GET'])
