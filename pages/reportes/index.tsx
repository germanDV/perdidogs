import type { NextPage, GetServerSideProps } from 'next'
import { fetchByCreator } from 'lib/models/dog'
import { Dog } from 'lib/models/dog-schema'
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
    const userId = String(ctx.query.sub)
    const resp = await fetchByCreator(userId)
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
      props: { dogs: [], error: 'Error obteniendo listado de perros' },
    }
  }
}

export default Reports
