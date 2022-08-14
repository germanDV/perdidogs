import { useState, useEffect } from 'react'
import { Dog } from 'lib/models/dog-schema'
import { PublicUser } from 'lib/models/user-schema'
import Button from 'components/Button/Button'
import Modal from 'components/Modal/Modal'
import http from 'lib/http/http'
import { HttpError } from 'lib/errors'

type Props = {
  dog: Dog
}

const Contact = ({ dog }: Props) => {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<PublicUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchUser() {
      setLoading(true)
      try {
        const u = await http<PublicUser>({ url: `/api/user/contact?id=${dog.creator}` })
        setUser(u)
      } catch (err) {
        if (err instanceof HttpError && err.code === 401) {
          setError('Tenés que ingresar para poder ver datos de contacto')
        } else {
          setError((err as Error).message)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [dog.creator])

  return (
    <div>
      <Button fullWidth onClick={() => setOpen(true)} category="secondary">
        Contactar
      </Button>

      <Modal aria="datos de contacto" open={open} onClose={() => setOpen(false)}>
        {loading ? (
          <p>cargando datos de contacto...</p>
        ) : error ? (
          <>
            <p>Error cargando datos.</p>
            <p>{error}</p>
          </>
        ) : (
          <>
            <h4>Contacto</h4>
            <p>
              Contactate por email a{' '}
              <strong>
                <a href={`mailto:${user?.email}`}>{user?.email}</a>
              </strong>
            </p>
          </>
        )}
      </Modal>
    </div>
  )
}

export default Contact
