import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware/allow-methods'
import { signup } from 'lib/models/user'
import { SignupUser } from 'lib/models/user-schema'
import { AppError } from 'lib/errors'
import { generate } from 'lib/token'
import { getAuthCookie } from 'lib/cookie'

type RespPayload = { id: string; token: string } | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const user: SignupUser = req.body
    const id = await signup(user)
    const token = await generate({ sub: id })
    res.setHeader('Set-Cookie', getAuthCookie(token))
    res.status(200).json({ id, token })
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
