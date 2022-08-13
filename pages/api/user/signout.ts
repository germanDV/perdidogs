import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware'
import { sendError } from 'lib/api/err-response'
import { AppError } from 'lib/errors'
import { expireCookie } from 'lib/auth/cookie'

type RespPayload = void | Omit<AppError, 'code'>

async function handler(_: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    res.setHeader('Set-Cookie', expireCookie())
    res.status(200).send()
  } catch (err) {
    sendError(res, err)
  }
}

export default allowMethods(handler, ['DELETE'])
