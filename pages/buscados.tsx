import type { NextPage, GetServerSideProps } from 'next'
import BackLink from 'components/BackLink/BackLink'
import Title from 'components/Title/Title'
import Subtitle from 'components/Subtitle/Subtitle'
import { Dog } from 'lib/models/dog'
import http from 'lib/http/http'

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

      {error ? (
        <p style={{ color: '#ff0000' }}>{error}</p>
      ) : (
        <pre>{JSON.stringify(dogs, null, 2)}</pre>
      )}
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const dogs = await http<Dog[]>({ url: '/api/dogs?status=perdido' })
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
