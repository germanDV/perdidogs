import type { NextApiRequest, NextApiResponse } from 'next'
import { Dog, fetchById } from 'lib/models/dog'

// TODO: crear `errs` module.
type ErrResp = { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Dog | ErrResp>) {
  const {
    method,
    query: { id },
  } = req

  // TODO: tal vez un middleware para métodos no aceptados?
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Método ${method} no permitido.` })
  }

  try {
    const dog = await fetchById(Number(id))
    if (!dog) {
      res.status(404).json({ message: `Perr@ con ID ${id} no encontrado.` })
      return
    }
    res.status(200).json(dog)
  } catch (err) {
    res.status(500).json({ message: (err as Error).message })
  }
}
