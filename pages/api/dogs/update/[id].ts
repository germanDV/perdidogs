import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware'
import { Dog, isDogBreed, isDogStatus } from 'lib/models/dog-schema'
import { update } from 'lib/models/dog'
import { sendError } from 'lib/api/err-response'
import { AppError, UpdateNotAllowed } from 'lib/errors'
import { revalidate } from 'lib/revalidate'
import { Filters } from 'lib/filters'
import {
  validateDescription,
  validateLocation,
  validateName,
  validateColor,
} from 'lib/validator/validator'

type RespPayload = Dog | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  const dogId = String(req.query.id)
  const userId = String(req.query.sub)

  const updates: Filters = {}

  if (req.body.status) {
    if (isDogStatus(req.body.status)) {
      updates.status = req.body.status
    } else {
      const msg = `"${req.body.status}" no es un estado válido.`
      sendError(res, new UpdateNotAllowed(msg))
      return
    }
  }

  if (req.body.name) {
    const [isValid, error] = validateName(req.body.name)
    if (isValid) {
      updates.name = req.body.name
    } else {
      sendError(res, error)
      return
    }
  }

  if (req.body.location) {
    const [isValid, error] = validateLocation(req.body.location)
    if (isValid) {
      updates.location = req.body.location
    } else {
      sendError(res, error)
      return
    }
  }

  if (req.body.description) {
    const [isValid, error] = validateDescription(req.body.description)
    if (isValid) {
      updates.description = req.body.description
    } else {
      sendError(res, error)
      return
    }
  }

  if (req.body.color) {
    const [isValid, error] = validateColor(req.body.color)
    if (isValid) {
      updates.color = [req.body.color]
    } else {
      sendError(res, error)
      return
    }
  }

  const { gender } = req.body
  if (gender) {
    if (['m', 'f'].includes(gender)) {
      updates.gender = gender
    } else {
      sendError(res, `Valor inválido para género (${gender})`)
      return
    }
  }

  const { breed } = req.body
  if (breed) {
    if (isDogBreed(breed)) {
      updates.breed = breed
    } else {
      sendError(res, `"${breed}" no es una raza válida.`)
      return
    }
  }

  try {
    const dog = await update(dogId, userId, updates)
    await revalidate(req, dog.status)
    res.status(200).json(dog)
  } catch (err) {
    sendError(res, err)
  }
}

export default allowMethods(handler, ['PUT'])
