import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware/allow-methods'
import { signup } from 'lib/models/user'
import { SignupUser } from 'lib/models/user-schema'
import { AppError } from 'lib/errors'

type RespPayload = { id: string } | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const user: SignupUser = req.body
    const id = await signup(user)
    res.status(200).json({ id })
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
