import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware'
import { AppError } from 'lib/errors'
import { expireCookie } from 'lib/auth/cookie'

type RespPayload = void | Omit<AppError, 'code'>

async function handler(_: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    res.setHeader('Set-Cookie', expireCookie())
    res.status(200).send()
  } catch (err) {
    const error = err as AppError
    const code = error.code || 500
    res.status(code).json({
      name: error.name || 'InternalServer',
      message: error.message,
    })
  }
}

export default allowMethods(handler, ['DELETE'])
