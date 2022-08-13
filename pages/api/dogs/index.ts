import { ApiRequest, ApiResponse } from 'lib/api/types'
import { AppError } from 'lib/errors'
import { allowMethods } from 'lib/api/middleware'
import { sendError } from 'lib/api/err-response'
import { fetchByStatus } from 'lib/models/dog'
import { Dog, isDogStatus } from 'lib/models/dog-schema'

type RespPayload = Dog[] | Omit<AppError, 'code'>

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
    sendError(res, err)
  }
}

export default allowMethods(handler, ['GET'])
