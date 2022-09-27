import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware'
import { sendError } from 'lib/api/err-response'
import { AppError, BadInputError } from 'lib/errors'
import { isValidImgURL } from 'lib/validator/validator'
import { addPicture } from 'lib/models/dog'

type RespPayload = { message: string } | Omit<AppError, 'code'>

async function handler(req: ApiRequest, res: ApiResponse<RespPayload>) {
  try {
    const userId = String(req.query.sub)
    const { dogId, pictureURL } = req.body

    if (!dogId || !pictureURL) {
      throw new BadInputError('Faltan campos obligatorios "dogId" y/o "pictureURL"')
    }

    if (!isValidImgURL(pictureURL)) {
      throw new BadInputError(`"${pictureURL}" no es válido.`)
    }

    await addPicture(dogId, userId, pictureURL)
    res.status(200).json({ message: 'Imágen agregada exitosamente.' })
  } catch (err) {
    sendError(res, err)
  }
}

export default allowMethods(handler, ['POST'])
