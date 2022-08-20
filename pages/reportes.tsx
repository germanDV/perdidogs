import type { NextPage, GetServerSideProps } from 'next'
import { Dog } from 'lib/models/dog-schema'
import http from 'lib/http/http'
import BackLink from 'components/BackLink/BackLink'
import Title from 'components/Title/Title'
import Subtitle from 'components/Subtitle/Subtitle'
import Dogs from 'components/Dogs/Dogs'
import { AppError } from 'lib/errors'

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
    const KEY = process.env.AUTH_COOKIE_KEY || ''
    const token = ctx.req.cookies[KEY] || ''

    const dogs = await http<Dog[]>({
      url: '/api/dogs/mine',
      headers: { Authorization: `Bearer ${token}` },
    })

    return {
      props: { dogs, error: '' },
    }
  } catch (err) {
    if ((err as AppError).code === 401) {
      return {
        redirect: {
          destination: '/ingresar',
          permanent: false,
        },
      }
    }
    return {
      props: { dogs: [], error: 'Error obteniendo listado de perros' },
    }
  }
}

export default Reports
