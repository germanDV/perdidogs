import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods, auth } from 'lib/api/middleware'
import { sendError } from 'lib/api/err-response'
import { save } from 'lib/models/dog'
import { Dog } from 'lib/models/dog-schema'
import { AppError } from 'lib/errors'

type RespPayload = { id: string } | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const dog: Partial<Dog> = req.body
    dog.creator = req.user._id
    const d = await save(dog)
    res.status(200).json({ id: d._id })
  } catch (err) {
    sendError(res, err)
  }
}

export default allowMethods(auth(handler), ['POST'])
