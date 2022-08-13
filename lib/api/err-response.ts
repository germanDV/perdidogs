import { ApiResponse } from 'lib/api/types'
import { AppError, isAppError } from 'lib/errors'

/**
 * Logs error and sends the http response
 */
export function sendError(res: ApiResponse<AppError>, error: unknown) {
  if (!isAppError(error)) {
    console.log('Uncategorized error', error)
    const message = error instanceof Error ? error.message : JSON.stringify(error)

    res.status(500).json({
      code: 500,
      name: 'UncategorizedError',
      message,
    })

    return
  }

  console.error(error)
  res.status(error.code).json(error)
}
