import { ApiRequest, ApiResponse } from 'lib/api/types'
import { AppError } from 'lib/errors'
import { allowMethods } from 'lib/api/middleware'
import { sendError } from 'lib/api/err-response'
import { findAll } from 'lib/models/dog'
import { Dog } from 'lib/models/dog-schema'
import { buildFilters } from 'lib/filters'

type RespPayload = Dog[] | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const filters = buildFilters(req.query)
    const dogs = await findAll(filters)
    res.status(200).json(dogs)
  } catch (err) {
    sendError(res, err)
  }
}

export default allowMethods(handler, ['GET'])
