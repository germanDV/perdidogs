import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware'
import { Dog, isDogStatus } from 'lib/models/dog-schema'
import { update } from 'lib/models/dog'
import { sendError } from 'lib/api/err-response'
import { AppError, UpdateNotAllowed } from 'lib/errors'
import { Filters } from 'lib/filters'

type RespPayload = Dog | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  const dogId = String(req.query.id)
  const userId = String(req.query.sub)

  const updates: Filters = {}

  // For now, the only allowed update is changing the status.
  if (req.body.status && isDogStatus(req.body.status)) {
    updates.status = req.body.status
  } else {
    sendError(res, new UpdateNotAllowed('Solo se permite actualizar `status`'))
    return
  }

  try {
    const dog = await update(dogId, userId, updates)
    res.status(200).json(dog)
  } catch (err) {
    sendError(res, err)
  }
}

export default allowMethods(handler, ['PUT'])
