import { useState } from 'react'
import Button from './Button'
import styles from './ReportButtons.module.scss'
import ConfirmResolve from 'components/Modal/ConfirmResolve'
import ConfirmDelete from 'components/Modal/ConfirmDelete'

type Props = {
  id: string
}

const ReportButtons = ({ id }: Props) => {
  const [openResolve, setOpenResolve] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleDelete = () => {
    console.log(`Eliminar ${id}`)
    setOpenDelete(false)
  }

  const handleFound = () => {
    console.log(`Resolve ${id}`)
    setOpenResolve(false)
  }

  return (
    <div className={styles.container}>
      <Button category="secondary" onClick={() => setOpenDelete(true)}>
        Eliminar
      </Button>
      <Button category="primary" onClick={() => setOpenResolve(true)}>
        Encontrado!
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
