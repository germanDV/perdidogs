import type { NextApiResponse } from 'next'
import { Dog, isDogStatus, fetchByStatus } from 'lib/models/dog'
import { ApiRequest, ApiErrResp } from 'lib/api/types'
import { fooMdw } from 'lib/api/middleware/foo'
import { barMdw } from 'lib/api/middleware/bar'

async function handler(req: ApiRequest, res: NextApiResponse<Dog[] | ApiErrResp>) {
  const {
    query: { status },
  } = req

  console.log(`req.foo = ${req.foo} - req.bar = ${req.bar}`)

  if (!req.query.status || !isDogStatus(status)) {
    res.status(400).json({ message: '`status` inválido o faltante.' })
    return
  }

  try {
    const dogs = await fetchByStatus(status)
    res.status(200).json(dogs)
  } catch (err) {
    res.status(500).json({ message: (err as Error).message })
  }
}

export default fooMdw(barMdw(handler))
