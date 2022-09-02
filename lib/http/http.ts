import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import type { NextRequest } from 'next/server'
import { HttpError } from 'lib/errors'

export function getFullURL(path: string, req?: NextRequest): string {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}${path}`
  }

  if (!req) {
    return `http://localhost:3000${path}`
  }

  let host = req.headers.get('host') || 'mmm:3000'
  let protocol = req.headers.get('host') ? 'https:' : 'http:'

  if (req.headers.get('x-forwarded-host')) {
    host = req.headers.get('x-forwarded-host') as string
  }

  if (req.headers.get('x-forwarded-proto')) {
    protocol = `${req.headers.get('x-forwarded-proto')}:`
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
