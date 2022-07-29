import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware/allow-methods'
import { signin } from 'lib/models/user'
import { SigninUser } from 'lib/models/user-schema'
import { AppError } from 'lib/errors'

const ENV = process.env.NODE_ENV

const EXP = Number(process.env.AUTH_TOKEN_EXP_DAYS) || 1
const expirationSeconds = EXP * 24 * 60 * 60

type RespPayload = { token: string } | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const user: SigninUser = req.body
    const token = await signin(user)

    let cookieString = `auth_token=${token}; HttpOnly; Path=/; Max-Age=${expirationSeconds}`
    if (ENV === 'production') {
      cookieString += '; Secure'
    }

    res.setHeader('Set-Cookie', cookieString)
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
