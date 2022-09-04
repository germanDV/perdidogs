import { useState } from 'react'
import Button from './Button'
import styles from './ReportButtons.module.scss'
import ConfirmResolve from 'components/Modal/ConfirmResolve'
import ConfirmDelete from 'components/Modal/ConfirmDelete'
import http, { getFullURL } from 'lib/http/http'
import { DogStatus } from 'lib/models/dog-schema'

type Props = {
  id: string
  onSuccess: () => void
  onError: (err: string) => void
}

const ReportButtons = ({ id, onSuccess, onError }: Props) => {
  const [openResolve, setOpenResolve] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      await http<{ id: string }>({ url: getFullURL(`/api/dogs/delete/${id}`), method: 'DELETE' })
      setOpenDelete(false)
      onSuccess()
    } catch (err) {
      console.error(err)
      setOpenDelete(false)
      onError(`Error eliminando reporte con ID ${id}`)
    } finally {
      setLoading(false)
    }
  }

  const handleFound = async () => {
    try {
      setLoading(true)
      await http<{ id: string }>({
        url: getFullURL(`/api/dogs/update/${id}`),
        method: 'PUT',
        data: { status: DogStatus.RESOLVED },
      })

      setOpenResolve(false)
      onSuccess()
    } catch (err) {
      console.error(err)
      setOpenResolve(false)
      onError(`Error actualizando reporte con ID ${id}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Button category="secondary" onClick={() => setOpenDelete(true)}>
        Eliminar
      </Button>
      <Button category="primary" onClick={() => setOpenResolve(true)}>
        Encontrado
      </Button>

      <ConfirmResolve
        open={openResolve}
        aria="confirmar actualización"
        onClose={() => setOpenResolve(false)}
        onConfirm={handleFound}
        loading={loading}
      />

      <ConfirmDelete
        open={openDelete}
        aria="confirmar eliminación"
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
    </div>
  )
}

export default ReportButtons
