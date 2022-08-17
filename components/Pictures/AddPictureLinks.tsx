import Image from 'next/image'
import { ChangeEvent } from 'react'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import styles from './AddPictureLinks.module.scss'

// TODO: improve, move to lib/ and add tests
function isValidImgURL(url: string): boolean {
  return Boolean(
    url && typeof url === 'string' && url.trim().length > 0 && url.startsWith('https://')
  )
}

const MAX_PICTURES = 6

type Props = {
  urls: Record<string, string>
  onChange: (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  addPictureInput: () => void
}

const AddPictureLinks = ({ urls, onChange, addPictureInput }: Props) => {
  const handleAddPictureInput = () => {
    if (Object.keys(urls).length >= MAX_PICTURES) {
      alert(`Máximo ${MAX_PICTURES} fotos.`)
      return
    }
    addPictureInput()
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

      <div className={styles.btn}>
        <Button category="secondary" onClick={handleAddPictureInput}>
          +
        </Button>
      </div>
    </div>
  )
}

export default AddPictureLinks
