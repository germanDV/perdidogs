import { fetchById, remove } from 'lib/models/dog'
import { Dog } from 'lib/models/dog-schema'
import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods, auth } from 'lib/api/middleware'
import { AppError } from 'lib/errors'

type GetRespPayload = Dog | Omit<AppError, 'code'>
type DeleteRespPayload = { id: string } | Omit<AppError, 'code'>

async function deleteHandler(req: ApiRequest, res: ApiResponse<DeleteRespPayload>) {
  try {
    const deletedId = await remove(String(req.query.id))
    res.status(200).json({ id: deletedId })
    return
  } catch (err) {
    const error = err as AppError
    const code = error.code || 500
    res.status(code).json({
      name: error.name || 'InternalServer',
      message: error.message,
    })
  }
}

async function getHandler(req: ApiRequest, res: ApiResponse<GetRespPayload>) {
  try {
    const dog = await fetchById(String(req.query.id))
    res.status(200).json(dog)
  } catch (err) {
    const error = err as AppError
    const code = error.code || 500
    res.status(code).json({
      name: error.name || 'InternalServer',
      message: error.message,
    })
  }
}

async function handler(req: ApiRequest, res: ApiResponse<GetRespPayload | DeleteRespPayload>) {
  if (req.method === 'DELETE') {
    const hdlr = auth(deleteHandler)
    return hdlr(req, res)
  }

  return getHandler(req, res)
}

export default allowMethods(handler, ['GET', 'DELETE'])
