import type { NextApiResponse } from 'next'
import { Dog, fetchById } from 'lib/models/dog'
import { ApiRequest, ApiErrResp } from 'lib/api/types'
import { fooMdw } from 'lib/api/middleware/foo'
import { barMdw } from 'lib/api/middleware/bar'

async function handler(req: ApiRequest, res: NextApiResponse<Dog | ApiErrResp>) {
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

export default fooMdw(barMdw(handler))
