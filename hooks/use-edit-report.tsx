import { useCallback, useState } from 'react'
import http, { getFullURL } from 'lib/http/http'
import { Dog } from 'lib/models/dog-schema'

export function useEditReport(id: string) {
  const [inProgress, setInProgress] = useState(false)
  const [error, setError] = useState('')

  const editReport = useCallback(
    async (key: keyof Dog, value: string) => {
      if (inProgress) return

      if (!value?.trim()) {
        setError('Campo obligatorio')
        return
      }

      try {
        setInProgress(true)
        setError('')

        await http<Dog>({
          url: getFullURL(`/api/dogs/update/${id}`),
          method: 'PUT',
          data: { [key]: value.trim() },
        })
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setInProgress(false)
      }
    },
    [id, inProgress]
  )

  return { editReport, error, inProgress }
}
