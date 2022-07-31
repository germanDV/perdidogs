import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { HttpError } from 'lib/errors'

const PROTO = process.env.NEXT_PUBLIC_PROTO
const HOST = process.env.NEXT_PUBLIC_HOST
const BASE_URL = `${PROTO}://${HOST}`

async function http<T>(cfg: AxiosRequestConfig): Promise<T> {
  const { method, url, headers, data, ...config } = cfg

  try {
    const resp: AxiosResponse<T> = await axios({
      method: method || 'GET',
      url: `${BASE_URL}${url}`,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      withCredentials: true,
      data: ['POST', 'PUT', 'PATCH'].includes((method || '').toUpperCase()) ? data : null,
      ...config,
    })
    return resp.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const code = error.response?.status || 500
      const name = error.code || 'UnknownHttpError'
      const err = error.response?.data as { name: string; message: string } | undefined
      const msg = err && err.message ? err.message : error.message
      throw new HttpError(msg, name, code)
    }
    throw new HttpError((error as Error).message, 'UnknownHttpError', 500)
  }
}

export default http
