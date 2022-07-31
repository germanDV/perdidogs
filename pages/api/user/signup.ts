import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware/allow-methods'
import { signup } from 'lib/models/user'
import { SignupUser, PublicUser } from 'lib/models/user-schema'
import { AppError } from 'lib/errors'
import { generate } from 'lib/auth/token'
import { getAuthCookie } from 'lib/auth/cookie'

type RespPayload = { user: PublicUser; token: string } | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const user: SignupUser = req.body
    const publicUser = await signup(user)
    const token = await generate({ sub: publicUser._id })
    res.setHeader('Set-Cookie', getAuthCookie(token))
    res.status(200).json({ user: publicUser, token })
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
