import { useState } from 'react'
import { useEditReport } from 'hooks/use-edit-report'
import { Breeds } from 'lib/models/dog-schema'
import EditIcon from 'icons/EditIcon'
import LockIcon from 'icons/LockIcon'
import CancelIcon from 'icons/CancelIcon'
import Alert, { Categories } from 'components/Alert/Alert'
import BreedSelect from 'components/Select/BreedSelect'
import styles from './Attribute.module.scss'

type Props = {
  dogId: string
  value: Breeds
  editable: boolean
}

const EditableBreed = ({ dogId, value: initialValue, editable }: Props) => {
  const [value, setValue] = useState(() => initialValue)
  const [editing, setEditing] = useState(false)
  const { editReport, error } = useEditReport(dogId)

  const handleEdit = async () => {
    await editReport('breed', value)
    setEditing(false)
  }

  const handleCancel = () => {
    setEditing(false)
  }

  return (
    <>
      <section className={styles.container}>
        <div className={styles.label}>Raza</div>

        <div className={styles.withicon}>
          {editing ? (
            <>
              <BreedSelect
                id="breed"
                value={value}
                onChange={(ev) => setValue(ev.target.value as Breeds)}
              />
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
      {error && <Alert category={Categories.ERROR}>Raza: {error}</Alert>}
    </>
  )
}

export default EditableBreed
