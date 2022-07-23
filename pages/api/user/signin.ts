import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware/allow-methods'
import { signin, SigninUser, Token } from 'lib/models/user'
import { AppError } from 'lib/errors'

type RespPayload = { token: Token } | AppError

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const user: SigninUser = req.body
    const token = await signin(user)
    res.status(200).json({ token })
  } catch (err) {
    res.status(500).json({
      name: (err as AppError).name || 'InternalServer',
      message: (err as AppError).message,
    })
  }
}

export default allowMethods(handler, ['POST'])
