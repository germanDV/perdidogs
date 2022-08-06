import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods, auth } from 'lib/api/middleware'
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
    const error = err as AppError
    const code = error.code || 500
    res.status(code).json({
      name: error.name || 'InternalServer',
      message: error.message,
    })
  }
}

export default allowMethods(auth(handler), ['POST'])
