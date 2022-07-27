import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware/allow-methods'
import { signin } from 'lib/models/user'
import { SigninUser, Token } from 'lib/models/user-schema'
import { AppError } from 'lib/errors'

type RespPayload = { token: Token } | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const user: SigninUser = req.body
    const token = await signin(user)
    res.status(200).json({ token })
  } catch (err) {
    const error = err as AppError
    const code = error.code || 500
    res.status(code).json({
      name: error.name || 'InternalServer',
      message: error.message,
    })
  }
}

export default allowMethods(handler, ['POST'])
