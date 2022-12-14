import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware'
import { sendError } from 'lib/api/err-response'
import { signin } from 'lib/models/user'
import { SigninUser, PublicUser } from 'lib/models/user-schema'
import { AppError } from 'lib/errors'
import { getAuthCookie } from 'lib/auth/cookie'

type RespPayload = { token: string; user: PublicUser } | AppError

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const creds: SigninUser = req.body
    const { token, user } = await signin(creds)
    res.setHeader('Set-Cookie', getAuthCookie(token))
    res.status(200).json({ token, user })
  } catch (err) {
    sendError(res, err)
  }
}

export default allowMethods(handler, ['POST'])
