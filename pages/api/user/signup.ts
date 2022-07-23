import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware/allow-methods'
import { signup, SignupUser } from 'lib/models/user'
import { AppError } from 'lib/errors'

type RespPayload = { id: number } | AppError

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const user: SignupUser = req.body
    const id = await signup(user)
    res.status(200).json({ id })
  } catch (err) {
    res.status(500).json({
      name: (err as AppError).name || 'InternalServer',
      message: (err as AppError).message,
    })
  }
}

export default allowMethods(handler, ['POST'])
