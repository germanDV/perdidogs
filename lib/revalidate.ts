import http, { getFullURL } from 'lib/http/http'
import { DogStatus } from 'lib/models/dog-schema'
import { ApiRequest } from 'lib/api/types'

/**
 * Revalida la página estática con listado de perros que corresponda.
 */
export function revalidate(req: ApiRequest, status: DogStatus) {
  const token = process.env.CACHE_REVALIDATION_TOKEN
  const path = status === DogStatus.FOUND ? '/encontrados' : '/buscados'
  const url = getFullURL(`/api/revalidate?path=${path}&token=${token}`, req)
  return http({ method: 'GET', url })
}
