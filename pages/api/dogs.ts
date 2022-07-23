import { ApiRequest, ApiResponse, ApiErrResp } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware/allow-methods'
import { Dog, isDogStatus, fetchByStatus } from 'lib/models/dog'

type RespPayload = Dog[] | ApiErrResp

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  const {
    query: { status },
  } = req

  if (!status || !isDogStatus(status)) {
    res.status(400).json({ message: '`status` inválido o faltante.' })
    return
  }

  try {
    const dogs = await fetchByStatus(status)
    res.status(200).json(dogs)
  } catch (err) {
    res.status(500).json({
      message: (err as Error).message,
      error: err as Error,
    })
  }
}

export default allowMethods(handler, ['GET'])
