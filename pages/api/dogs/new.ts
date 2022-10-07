import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware'
import { sendError } from 'lib/api/err-response'
import { save } from 'lib/models/dog'
import { Dog } from 'lib/models/dog-schema'
import { AppError } from 'lib/errors'
import { revalidate } from 'lib/revalidate'

type RespPayload = { id: string } | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const dog: Partial<Dog> = req.body
    dog.creator = String(req.query.sub)
    const d = await save(dog)
    if (dog.status) await revalidate(req, dog.status)
    res.status(200).json({ id: d._id })
  } catch (err) {
    sendError(res, err)
  }
}

export default allowMethods(handler, ['POST'])
