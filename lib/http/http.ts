import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { HttpError } from 'lib/errors'

const { PROTO, HOST } = process.env
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
      data: ['POST', 'PUT', 'PATCH'].includes((method || '').toUpperCase()) ? data : null,
      ...config,
    })
    return resp.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const code = error.response?.status || 500
      const name = error.code || 'UnknownHttpError'
      const err = error.response?.data as { error: string } | undefined
      const msg = err && err.error ? err.error : error.message
      throw new HttpError(msg, name, code)
    }
    throw new HttpError((error as Error).message, 'UnknownHttpError', 500)
  }
}

export default http
