import { ApiRequest, ApiResponse, ApiErrResp } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware/allow-methods'
import { Dog, save } from 'lib/models/dog'

type RespPayload = { id: number } | ApiErrResp

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  const dog: Omit<Dog, '_id'> = req.body

  try {
    const id = await save(dog)
    res.status(200).json({ id })
  } catch (err) {
    res.status(500).json({ message: (err as Error).message })
  }
}

export default allowMethods(handler, ['POST'])
