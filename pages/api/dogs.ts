import { ApiRequest, ApiResponse } from 'lib/api/types'
import { AppError } from 'lib/errors'
import { allowMethods } from 'lib/api/middleware/allow-methods'
import { Dog, isDogStatus, fetchByStatus } from 'lib/models/dog'

type RespPayload = Dog[] | AppError

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  const {
    query: { status },
  } = req

  if (!status || !isDogStatus(status)) {
    res.status(400).json({
      name: 'BadRequest',
      message: '`status` inválido o faltante.',
    })

    return
  }

  try {
    const dogs = await fetchByStatus(status)
    res.status(200).json(dogs)
  } catch (err) {
    res.status(500).json({
      name: (err as AppError).name || 'InternalServer',
      message: (err as AppError).message,
    })
  }
}

export default allowMethods(handler, ['GET'])
