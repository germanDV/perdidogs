import { ApiRequest, ApiResponse } from 'lib/api/types'
import { generate, verify } from 'lib/token'

async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === 'POST') {
    try {
      const claims = await verify(req.body.token)
      res.status(200).send({ claims })
    } catch (err) {
      console.log(err)
      res.status(401).send((err as Error).message)
    }
    return
  }

  try {
    const token = await generate('23')
    res.status(200).send({ token })
  } catch (err) {
    console.log(err)
    res.status(500).send((err as Error).message)
  }
}

export default handler
