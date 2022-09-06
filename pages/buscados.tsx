import type { NextPage, GetServerSideProps } from 'next'
import BackLink from 'components/BackLink/BackLink'
import Title from 'components/Title/Title'
import Subtitle from 'components/Subtitle/Subtitle'
import Dogs from 'components/Dogs/Dogs'
import { fetchByStatus } from 'lib/models/dog'
import { Dog, DogStatus } from 'lib/models/dog-schema'

type Props = {
  dogs: Dog[]
  error: string
}

const Buscados: NextPage<Props> = ({ dogs, error }) => {
  return (
    <main>
      <BackLink to="/" label="Inicio" />
      <Title>Buscad@s</Title>
      <Subtitle>Dueñ@s buscando a su perr@</Subtitle>
      {error ? <p style={{ color: '#ff0000' }}>{error}</p> : <Dogs dogs={dogs} />}
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const resp = await fetchByStatus(DogStatus.LOST)
    const dogs: Dog[] = []

    resp.forEach((i) =>
      dogs.push({
        ...i._doc,
        _id: i._doc._id.toString(),
        creator: i._doc.creator.toString(),
      })
    )

    return {
      props: { dogs, error: '' },
    }
  } catch (err) {
    return {
      props: { dogs: [], error: 'Falla obteniendo listado de perros' },
    }
  }
}

export default Buscados
