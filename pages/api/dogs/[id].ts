import { fetchById, remove, update } from 'lib/models/dog'
import { Dog, isDogStatus } from 'lib/models/dog-schema'
import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods, auth } from 'lib/api/middleware'
import { sendError } from 'lib/api/err-response'
import { AppError, UpdateNotAllowed } from 'lib/errors'
import { Filters } from 'lib/filters'

type GetAndPutRespPayload = Dog | Omit<AppError, 'code'>
type DeleteRespPayload = { id: string } | Omit<AppError, 'code'>

async function deleteHandler(req: ApiRequest, res: ApiResponse<DeleteRespPayload>) {
  try {
    const deletedId = await remove(String(req.query.id), req.user._id)
    res.status(200).json({ id: deletedId })
    return
  } catch (err) {
    sendError(res, err)
  }
}

async function putHandler(req: ApiRequest, res: ApiResponse<GetAndPutRespPayload>) {
  const dogId = String(req.query.id)
  const updates: Filters = {}

  // For now, the only allowed update is changing the status.
  if (req.body.status && isDogStatus(req.body.status)) {
    updates.status = req.body.status
  } else {
    sendError(res, new UpdateNotAllowed('Solo se permite actualizar `status`'))
    return
  }

  try {
    const dog = await update(dogId, req.user._id, updates)
    res.status(200).json(dog)
  } catch (err) {
    sendError(res, err)
  }
}

async function getHandler(req: ApiRequest, res: ApiResponse<GetAndPutRespPayload>) {
  try {
    const dog = await fetchById(String(req.query.id))
    res.status(200).json(dog)
  } catch (err) {
    sendError(res, err)
  }
}

async function handler(
  req: ApiRequest,
  res: ApiResponse<GetAndPutRespPayload | DeleteRespPayload>
) {
  if (req.method === 'DELETE') {
    const hdlr = auth(deleteHandler)
    return hdlr(req, res)
  }

  if (req.method === 'PUT') {
    const hdlr = auth(putHandler)
    return hdlr(req, res)
  }

  return getHandler(req, res)
}

export default allowMethods(handler, ['GET', 'DELETE', 'PUT'])
