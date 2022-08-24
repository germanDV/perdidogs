import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware'
import { remove } from 'lib/models/dog'
import { sendError } from 'lib/api/err-response'
import { AppError } from 'lib/errors'

type RespPayload = { id: string } | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const dogId = String(req.query.id)
    const userId = String(req.query.sub)
    const deletedId = await remove(dogId, userId)
    res.status(200).json({ id: deletedId })
    return
  } catch (err) {
    sendError(res, err)
  }
}

export default allowMethods(handler, ['DELETE'])
