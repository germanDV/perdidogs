import { useState } from 'react'
import Button from './Button'
import styles from './ReportButtons.module.scss'
import ConfirmResolve from 'components/Modal/ConfirmResolve'
import ConfirmDelete from 'components/Modal/ConfirmDelete'
import http from 'lib/http/http'
import { DogStatus } from 'lib/models/dog-schema'

type Props = {
  id: string
  onSuccess: () => void
  onError: (err: string) => void
}

const ReportButtons = ({ id, onSuccess, onError }: Props) => {
  const [openResolve, setOpenResolve] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleDelete = async () => {
    try {
      await http<{ id: string }>({ url: `/api/dogs/${id}`, method: 'DELETE' })
      setOpenDelete(false)
      onSuccess()
    } catch (err) {
      console.error(err)
      setOpenDelete(false)
      onError(`Error eliminando reporte con ID ${id}`)
    }
  }

  const handleFound = async () => {
    try {
      await http<{ id: string }>({
        url: `/api/dogs/${id}`,
        method: 'PUT',
        data: { status: DogStatus.RESOLVED },
      })

      setOpenResolve(false)
      onSuccess()
    } catch (err) {
      console.error(err)
      setOpenResolve(false)
      onError(`Error actualizando reporte con ID ${id}`)
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
      />

      <ConfirmDelete
        open={openDelete}
        aria="confirmar eliminación"
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export default ReportButtons
