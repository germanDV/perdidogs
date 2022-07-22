import type { NextApiRequest, NextApiResponse } from 'next'

export type AdditionalRequestFields = {
  foo: boolean
  bar: boolean
}

export type ApiRequest = NextApiRequest & AdditionalRequestFields

export type ApiErrResp = { message: string }

type ApiHandler<T = any> = (req: ApiRequest, res: NextApiResponse<T>) => unknown | Promise<unknown>

export interface Middleware {
  (handler: ApiHandler): (req: ApiRequest, res: NextApiResponse) => void
}
