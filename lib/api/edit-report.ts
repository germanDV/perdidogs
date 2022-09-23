import http, { getFullURL } from 'lib/http/http'
import { Dog } from 'lib/models/dog-schema'

export async function editReport(id: string, key: keyof Dog, value: string): Promise<string> {
  await http<Dog>({
    url: getFullURL(`/api/dogs/update/${id}`),
    method: 'PUT',
    data: { [key]: value },
  })

  return 'OK'
}
