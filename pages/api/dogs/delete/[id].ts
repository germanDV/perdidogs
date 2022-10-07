import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware'
import { remove } from 'lib/models/dog'
import { sendError } from 'lib/api/err-response'
import { AppError } from 'lib/errors'
import { revalidate } from 'lib/revalidate'

type RespPayload = { id: string | null } | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const dogId = String(req.query.id)
    const userId = String(req.query.sub)
    const deleted = await remove(dogId, userId)
    if (deleted?.status) await revalidate(req, deleted.status)
    res.status(200).json({ id: deleted?._id || null })
    return
  } catch (err) {
    sendError(res, err)
  }
}

export default allowMethods(handler, ['DELETE'])
