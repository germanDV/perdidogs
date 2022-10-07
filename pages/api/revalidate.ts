import { ApiRequest, ApiResponse } from 'lib/api/types'
import { AppError } from 'lib/errors'
import { allowMethods } from 'lib/api/middleware'
import { sendError } from 'lib/api/err-response'
import { BadInputError } from 'lib/errors'

type RespPayload = { revalidated: true } | { message: string } | AppError

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  console.log(`Got a request to revalidate ${req.query.path}`)
  if (req.query.token !== process.env.CACHE_REVALIDATION_TOKEN) {
    console.log(
      `Tokens do not match. Got: ${req.query.token}, Want: ${process.env.CACHE_REVALIDATION_TOKEN}`
    )
    return res.status(401).json({ message: 'Invalid cache revalidation token' })
  }

  try {
    const { path } = req.query
    if (!path || typeof path !== 'string') {
      throw new BadInputError('Missing "path"')
    }

    await res.revalidate(path)
    res.status(200).json({ revalidated: true })
  } catch {
    sendError(res, new Error('Error revalidating'))
  }
}

export default allowMethods(handler, ['GET'])
