import { Dog, fetchById } from 'lib/models/dog'
import { ApiRequest, ApiResponse, ApiErrResp } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware/allow-methods'

type RespPayload = Dog | ApiErrResp

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  const {
    query: { id },
  } = req

  try {
    const dog = await fetchById(Number(id))
    if (!dog) {
      res.status(404).json({ message: `Perr@ con ID ${id} no encontrado.` })
      return
    }
    res.status(200).json(dog)
  } catch (err) {
    res.status(500).json({
      message: (err as Error).message,
      error: err as Error,
    })
  }
}

export default allowMethods(handler, ['GET', 'HEAD'])
