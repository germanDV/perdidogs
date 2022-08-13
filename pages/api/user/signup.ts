import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware'
import { sendError } from 'lib/api/err-response'
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
    sendError(res, err)
  }
}

export default allowMethods(handler, ['POST'])
