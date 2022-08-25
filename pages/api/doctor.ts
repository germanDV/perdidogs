import { ApiRequest, ApiResponse } from 'lib/api/types'
import { allowMethods } from 'lib/api/middleware'
import { sendError } from 'lib/api/err-response'
import { stats as getUserStats } from 'lib/models/user'
import { stats as getDogStats } from 'lib/models/dog'
import pkg from 'package.json'

async function handler(_: ApiRequest, res: ApiResponse) {
  try {
    const userStats = await getUserStats()
    const dogStats = await getDogStats()

    const status = {
      web: {
        up: true,
        version: pkg.version,
      },
      db: {
        users: userStats,
        dogs: dogStats,
      },
    }

    res.status(200).json(status)
  } catch (err) {
    sendError(res, err)
  }
}

export default allowMethods(handler, ['GET'])
