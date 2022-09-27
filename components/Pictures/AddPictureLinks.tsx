import Image from 'next/image'
import { useState, ChangeEvent } from 'react'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import Alert, { Categories } from 'components/Alert/Alert'
import styles from './AddPictureLinks.module.scss'
import { isValidImgURL } from 'lib/validator/validator'
import { MAX_PICTURES } from 'lib/models/dog-schema'

type Props = {
  urls: Record<string, string>
  onChange: (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  addPictureInput?: () => void
  error: string
}

const AddPictureLinks = ({ urls, onChange, addPictureInput, error }: Props) => {
  const [maxError, setMaxError] = useState('')

  const handleAddPictureInput = () => {
    if (addPictureInput) {
      if (Object.keys(urls).length >= MAX_PICTURES) {
        setMaxError(`Máximo ${MAX_PICTURES} fotos.`)
        return
      }
      setMaxError('')
      addPictureInput()
    }
  }

  return (
    <div className={styles.container}>
      <h4>Fotos:</h4>

      {Object.entries(urls).map(([id, url]) => (
        <div key={id}>
          <Input
            type="url"
            id={id}
            value={url}
            onChange={onChange}
            placeholder="Enlace a foto"
            error=""
          />
          {isValidImgURL(url) && (
            <Image src={url || ''} alt={`Foto #${id}`} width={100} height={100} />
          )}
        </div>
      ))}

      {addPictureInput && (
        <div className={styles.btn}>
          <Button category="secondary" onClick={handleAddPictureInput}>
            +
          </Button>
        </div>
      )}

      {error && <Alert category={Categories.ERROR}>{error}</Alert>}

      {!error && maxError ? (
        <Alert category={Categories.WARNING} onClose={() => setMaxError('')}>
          {maxError}
        </Alert>
      ) : null}
    </div>
  )
}

export default AddPictureLinks
