import { useState, useEffect } from 'react'
import { Dog } from 'lib/models/dog-schema'
import { PublicUser } from 'lib/models/user-schema'
import Button from 'components/Button/Button'
import Modal from 'components/Modal/Modal'
import http from 'lib/http/http'
import { useUser } from 'hooks/use-user'
import styles from './Contact.module.scss'

type Props = {
  dog: Dog
}

const Contact = ({ dog }: Props) => {
  const { user } = useUser()
  const [open, setOpen] = useState(false)
  const [contactDetails, setContactDetails] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchUser() {
      setLoading(true)
      try {
        const u = await http<PublicUser>({ url: `/api/user/contact?id=${dog.creator}` })
        setContactDetails(u.email)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    if (dog.contact) {
      setContactDetails(dog.contact)
    } else {
      fetchUser()
    }
  }, [dog.contact, dog.creator])

  return (
    <div>
      <Button fullWidth onClick={() => setOpen(true)} category="secondary">
        Contactar
      </Button>

      <Modal aria="datos de contacto" open={open} onClose={() => setOpen(false)}>
        {loading ? (
          <>
            <h4>Contacto</h4>
            <p>cargando datos de contacto...</p>
          </>
        ) : !user ? (
          <>
            <h4>Contacto</h4>
            <p>Debes ingresar a tu cuenta para ver datos de contacto.</p>
          </>
        ) : error ? (
          <>
            <h4>Contacto</h4>
            <p>Error cargando datos.</p>
            <p>{error}</p>
          </>
        ) : (
          <>
            <h4>Contacto</h4>
            <p>
              Contactate con el creador del reporte:{' '}
              <span className={styles.main}>{contactDetails}</span>
            </p>
          </>
        )}
      </Modal>
    </div>
  )
}

export default Contact
