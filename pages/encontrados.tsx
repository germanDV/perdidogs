import type { NextPage, GetServerSideProps } from 'next'
import BackLink from 'components/BackLink/BackLink'
import Title from 'components/Title/Title'
import Subtitle from 'components/Subtitle/Subtitle'
import Dogs from 'components/Dogs/Dogs'
import { Dog } from 'lib/models/dog-schema'
import http, { getFullURL } from 'lib/http/http'

type Props = {
  dogs: Dog[]
  error: string
}

const Encontrados: NextPage<Props> = ({ dogs, error }) => {
  return (
    <main>
      <BackLink to="/" label="Inicio" />
      <Title>Encontrad@s</Title>
      <Subtitle>Perr@s buscando a su dueñ@</Subtitle>
      {error ? <p style={{ color: '#ff0000' }}>{error}</p> : <Dogs dogs={dogs} />}
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const dogs = await http<Dog[]>({ url: getFullURL('/api/dogs?status=encontrado') })
    return {
      props: { dogs, error: '' },
    }
  } catch (err) {
    return {
      props: { dogs: [], error: 'Falla obteniendo listado de perros' },
    }
  }
}

export default Encontrados
