import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { IncomingMessage } from 'http'
import { HttpError } from 'lib/errors'

export function getFullURL(path: string, req?: IncomingMessage): string {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}${path}`
  }

  if (!req) {
    return `http://localhost:3000${path}`
  }

  let host = req.headers?.host || 'localhost:3000'
  let protocol = /^localhost/.test(host) ? 'http:' : 'https:'

  if (req.headers['x-forwarded-host'] && typeof req.headers['x-forwarded-host'] === 'string') {
    host = req.headers['x-forwarded-host']
  }

  if (req.headers['x-forwarded-proto'] && typeof req.headers['x-forwarded-proto'] === 'string') {
    protocol = req.headers['x-forwarded-proto']
  }

  return `${protocol}//${host}${path}`
}

async function http<T>(cfg: AxiosRequestConfig): Promise<T> {
  const { method, url, headers, data, ...config } = cfg

  try {
    const resp: AxiosResponse<T> = await axios({
      method: method || 'GET',
      url,
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
