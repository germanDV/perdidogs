import { useState, ChangeEvent } from 'react'
import AddPictureLinks from 'components/Pictures/AddPictureLinks'
import http, { getFullURL } from 'lib/http/http'
import Modal, { Props as ModalProps } from './Modal'

type Props = Omit<Omit<ModalProps, 'children'>, 'onConfirm'> & {
  dogId: string
  onConfirm: (url: string) => void
}

const key = '1'

const AddPicture = ({ open, aria, onClose, onConfirm, dogId }: Props) => {
  const [loading, setLoading] = useState(false)
  const [urls, setURLs] = useState<Record<string, string>>(() => ({ [key]: '' }))
  const [error, setError] = useState('')

  const handlePictureChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setURLs((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }))
  }

  const handleConfirm = async () => {
    if (!urls[key]) {
      setError('Debes agregar una imágen.')
      return
    }

    setLoading(true)
    try {
      await http<{ message: string }>({
        method: 'POST',
        url: getFullURL('/api/pictures/add'),
        data: { dogId, pictureURL: urls[key] },
      })

      if (onConfirm) {
        onConfirm(urls[key])
      }
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} aria={aria} onClose={onClose} onConfirm={handleConfirm} loading={loading}>
      <h4 style={{ marginBottom: 18 }}>Agregar imágen</h4>
      <AddPictureLinks urls={urls} onChange={handlePictureChange} error={error} />
    </Modal>
  )
}

export default AddPicture
