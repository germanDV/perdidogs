import type { NextApiRequest, NextApiResponse } from 'next'
import { Dog, isDogStatus, fetchByStatus } from 'lib/models/dog'

type ErrResp = { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Dog[] | ErrResp>) {
  const {
    query: { status },
  } = req

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
