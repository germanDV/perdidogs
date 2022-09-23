import { useState, useRef } from 'react'
import { editReport } from 'lib/api/edit-report'
import { Dog } from 'lib/models/dog-schema'
import EditIcon from 'icons/EditIcon'
import LockIcon from 'icons/LockIcon'
import CancelIcon from 'icons/CancelIcon'
import Alert, { Categories } from 'components/Alert/Alert'
import styles from './Attribute.module.scss'

type Props = {
  dogId: string
  property: keyof Dog
  label: string
  value: string
  editable?: boolean
}

const Attribute = ({ dogId, property, label, value: initialValue, editable }: Props) => {
  const [value, setValue] = useState(() => initialValue)
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState('')
  const ref = useRef<HTMLInputElement>(null)

  const handleEdit = async () => {
    const newValue = ref.current?.value.trim()
    if (!newValue) {
      setError('Está vacío.')
      return
    }

    try {
      setError('')
      await editReport(dogId, property, newValue)
      setValue(newValue)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setEditing(false)
    }
  }

  const handleCancel = () => {
    setEditing(false)
  }

  return (
    <>
      <section className={styles.container}>
        <div className={styles.label}>{label}</div>

        <div className={styles.withicon}>
          {editing ? (
            <>
              <input type="text" defaultValue={value} ref={ref} />
              <div onClick={handleEdit} title="Guardar">
                <LockIcon />
              </div>
              <div onClick={handleCancel} title="Cancelar">
                <CancelIcon />
              </div>
            </>
          ) : (
            <>
              <span>{value}</span>
              {editable && (
                <div onClick={() => setEditing(true)} title="Editar">
                  <EditIcon />
                </div>
              )}
            </>
          )}
        </div>
      </section>
      {error && (
        <Alert category={Categories.ERROR}>
          {label}: {error}
        </Alert>
      )}
    </>
  )
}

export default Attribute
