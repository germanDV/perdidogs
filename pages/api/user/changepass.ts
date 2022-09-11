import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware'
import { AppError } from 'lib/errors'
import { sendError } from 'lib/api/err-response'
import { changePass } from 'lib/models/user'

type RespPayload = void | AppError

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const userId = String(req.query.sub)
    const data: { oldPass: string; newPass: string } = req.body
    await changePass(userId, data.oldPass, data.newPass)
    res.status(200).end()
  } catch (err) {
    sendError(res, err)
  }
}

export default allowMethods(handler, ['POST'])
