import type { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Dog, DogStatus } from 'lib/models/dog-schema'
import http from 'lib/http/http'
import { printDate } from 'lib/date'
import { useUser } from 'hooks/use-user'
import styles from 'styles/Reporte.module.scss'
import BackLink from 'components/BackLink/BackLink'
import Title from 'components/Title/Title'
import Attribute from 'components/Attribute/Attribute'
import ReportButtons from 'components/Button/ReportButtons'
import Alert, { Categories } from 'components/Alert/Alert'
import Contact from 'components/Contact/Contact'
import Pictures from 'components/Pictures/Pictures'

type Props = {
  dog: Dog | null
  error: string
}

function getTitle(gender: 'm' | 'f', status: DogStatus): string {
  if (gender === 'f') {
    return `perra ${status === DogStatus.LOST ? 'perdida' : 'encontrada'}`
  }
  return `perro ${status}`
}

const Post: NextPage<Props> = ({ dog, error }) => {
  const { user } = useUser()
  const router = useRouter()
  const [apiError, setAPIError] = useState('')
  const [message, setMessage] = useState('')

  if (error || apiError || !dog) {
    return <p style={{ color: '#ff0000' }}>{error}</p>
  }

  const onError = (error: string) => {
    setAPIError(error)
  }

  const onSuccess = () => {
    setMessage('Operación exitosa, redirigiendo en 3s')
    setTimeout(() => router.push('/reportes'), 3_000)
  }

  return (
    <main>
      <BackLink to="/" label="Inicio" />
      <Title>{getTitle(dog.gender, dog.status)}</Title>

      <div className={styles.data}>
        <Pictures pictures={dog.pictures} />

        <Attribute label="raza" value={dog.breed} />
        <Attribute label="género" value={dog.gender === 'f' ? 'Hembra' : 'Macho'} />
        <Attribute label="fecha" value={printDate(dog.date)} />
        <Attribute label="color" value={dog.color.join(', ')} />
        {dog.name !== 'NN' && <Attribute label="nombre" value={dog.name} />}
        <Attribute label="zona" value={dog.location} />
        <Attribute label="descripción" value={dog.description} />

        {user && user._id === dog.creator ? (
          <ReportButtons id={dog._id} onError={onError} onSuccess={onSuccess} />
        ) : (
          <Contact dog={dog} />
        )}

        {message && <Alert category={Categories.SUCCESS}>{message}</Alert>}
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx.params ? ctx.params.id : ''
    const dog = await http<Dog>({ url: `/api/dogs/${id}` })
    return {
      props: { dog, error: '' },
    }
  } catch (err) {
    return {
      props: { dog: null, error: 'Error obteniendo reporte' },
    }
  }
}

export default Post
