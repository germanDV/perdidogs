import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

const { PROTO, HOST } = process.env
const BASE_URL = `${PROTO}://${HOST}`

async function client<T>(cfg: AxiosRequestConfig): Promise<T> {
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
      const err = error.response?.data
      // @ts-ignore
      const msg = err && err.error ? err.error : error.message
      throw new Error(msg)
    }
    throw error
  }
}

export default client
