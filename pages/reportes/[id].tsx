import type { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { fetchById } from 'lib/models/dog'
import { Dog, DogStatus } from 'lib/models/dog-schema'
import { printDate } from 'lib/date'
import { useUser } from 'hooks/use-user'
import styles from 'styles/Reporte.module.scss'
import BackLink from 'components/BackLink/BackLink'
import Title from 'components/Title/Title'
import Attribute from 'components/Attribute/Attribute'
import EditableGender from 'components/Attribute/EditableGender'
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
  const isCreator = Boolean(user && user._id === dog?.creator)

  if (error || apiError || !dog) {
    return <p style={{ color: '#ff0000' }}>{error}</p>
  }

  const onError = (error: string) => {
    setAPIError(error)
  }

  const onSuccess = () => {
    setMessage('Operación exitosa, redirigiendo en 3s...')
    setTimeout(() => router.push('/reportes'), 3_000)
  }

  return (
    <main>
      <BackLink to="/" label="Inicio" />
      <Title>{getTitle(dog.gender, dog.status)}</Title>

      <div className={styles.data}>
        <Pictures pictures={dog.pictures} />

        <Attribute label="raza" value={dog.breed} dogId={dog._id} property="breed" />
        <EditableGender dogId={dog._id} value={dog.gender} />
        <Attribute label="fecha" value={printDate(dog.date)} dogId={dog._id} property="date" />
        <Attribute
          dogId={dog._id}
          property="color"
          label="color"
          value={dog.color.join(', ')}
          editable={isCreator}
        />
        {dog.name !== 'NN' && (
          <Attribute
            dogId={dog._id}
            property="name"
            label="nombre"
            value={dog.name}
            editable={isCreator}
          />
        )}
        <Attribute
          dogId={dog._id}
          property="location"
          label="zona"
          value={dog.location}
          editable={isCreator}
        />
        <Attribute
          dogId={dog._id}
          property="description"
          label="descripción"
          value={dog.description}
          editable={isCreator}
        />

        {isCreator ? (
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
    const id = ctx.params ? String(ctx.params.id) : ''
    const resp = await fetchById(id)

    const dog = {
      ...resp._doc,
      _id: resp._doc._id.toString(),
      creator: resp._doc.creator.toString(),
    }

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
