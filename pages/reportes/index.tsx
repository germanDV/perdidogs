import type { NextPage, GetServerSideProps } from 'next'
import { Dog } from 'lib/models/dog-schema'
import http from 'lib/http/http'
import BackLink from 'components/BackLink/BackLink'
import Title from 'components/Title/Title'
import Subtitle from 'components/Subtitle/Subtitle'
import Dogs from 'components/Dogs/Dogs'

type Props = {
  dogs: Dog[]
  error: string
}

const Reports: NextPage<Props> = ({ dogs, error }) => {
  return (
    <main>
      <BackLink to="/" label="Inicio" />
      <Title>Mis Reportes</Title>
      <Subtitle>{}</Subtitle>
      {error ? <p style={{ color: '#ff0000' }}>{error}</p> : <Dogs dogs={dogs} />}
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const authCookie = `auth_token=${ctx.req.cookies['auth_token']}`
    const dogs = await http<Dog[]>({ url: '/api/dogs/mine', headers: { Cookie: authCookie } })
    return {
      props: { dogs, error: '' },
    }
  } catch (err) {
    return {
      props: { dogs: [], error: 'Error obteniendo listado de perros' },
    }
  }
}

export default Reports
