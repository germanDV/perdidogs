import { useState } from 'react'
import { useEditReport } from 'hooks/use-edit-report'
import EditIcon from 'icons/EditIcon'
import LockIcon from 'icons/LockIcon'
import CancelIcon from 'icons/CancelIcon'
import Alert, { Categories } from 'components/Alert/Alert'
import GenderSelect from 'components/Select/GenderSelect'
import styles from './Attribute.module.scss'

type Props = {
  dogId: string
  value: string
  editable: boolean
}

function displayGender(gender: string): 'Macho' | 'Hembra' | '' {
  if (gender === 'f') return 'Hembra'
  if (gender === 'm') return 'Macho'
  return ''
}

const EditableGender = ({ dogId, value: initialValue, editable }: Props) => {
  const [value, setValue] = useState(() => initialValue)
  const [editing, setEditing] = useState(false)
  const { editReport, error } = useEditReport(dogId)

  const handleEdit = async () => {
    await editReport('gender', value)
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
              <GenderSelect
                id="gender"
                value={value}
                onChange={(ev) => setValue(ev.target.value)}
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
              <span>{displayGender(value)}</span>
              {editable && (
                <div onClick={() => setEditing(true)} title="Editar">
                  <EditIcon />
                </div>
              )}
            </>
          )}
        </div>
      </section>
      {error && <Alert category={Categories.ERROR}>Género: {error}</Alert>}
    </>
  )
}

export default EditableGender
