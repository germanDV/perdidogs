/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next'

type AdditionalRequestFields = {
  sub: string
}

export type ApiRequest = NextApiRequest & AdditionalRequestFields

// Alias just for convenience, to import all from same place.
export type ApiResponse<T = any> = NextApiResponse<T>

export type ApiHandler<T = any> = (
  req: ApiRequest,
  res: NextApiResponse<T>
) => unknown | Promise<unknown>
