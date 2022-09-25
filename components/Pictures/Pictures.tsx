import Image from 'next/image'
import { useState, MouseEvent } from 'react'
import http, { getFullURL } from 'lib/http/http'
import TrashIcon from 'icons/TrashIcon'
import Modal from 'components/Modal/Modal'
import styles from './Pictures.module.scss'

type Props = {
  dogId: string
  isCreator: boolean
  pictures: string[] | undefined
}

const Pictures = ({ dogId, isCreator, pictures: initialPics }: Props) => {
  const [modal, setModal] = useState('')
  const [pictures, setPictures] = useState(() => initialPics || [])

  const [selected, setSelected] = useState(() => {
    if (pictures && pictures.length > 0) {
      return pictures[0]
    }
    return ''
  })

  if (!pictures || pictures.length === 0) {
    return null
  }

  const handleSelection = (ev: MouseEvent, p: string) => {
    ev.stopPropagation()
    setSelected(p)
  }

  const handleDelete = async () => {
    if (pictures.length === 1) {
      setModal(
        'Debe haber al menos una imágen. Si desea eliminar esta imágen, agregue otra primero.'
      )
      return
    }

    try {
      await http<{ message: string }>({
        method: 'PUT',
        url: getFullURL('/api/pictures/remove'),
        data: { dogId, pictureURL: selected },
      })

      setPictures((pics) => {
        const keep = pics.filter((p) => p !== selected)
        setSelected(keep[0])
        return keep
      })
    } catch (err) {
      setModal(`Error eliminando imágen: ${(err as Error).message}`)
    }
  }

  return (
    <div className={styles.container}>
      {isCreator && (
        <div className={styles.actions}>
          <div className={styles.remove} onClick={handleDelete} title="Eliminar imágen">
            <TrashIcon />
          </div>
        </div>
      )}

      <Modal open={Boolean(modal)} aria="Advertencia mínimo imágenes" onClose={() => setModal('')}>
        {modal}
      </Modal>

      <Image src={selected} alt="Foto" width="500" height="400" layout="responsive" priority />

      {pictures.length > 1 && (
        <div className={styles.stripe}>
          {pictures.map((p) => (
            <div key={p} onClick={(ev) => handleSelection(ev, p)}>
              <Image src={p} alt="Foto" width="50" height="40" layout="responsive" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Pictures
