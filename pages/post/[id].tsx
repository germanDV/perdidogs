import type { NextPage, GetServerSideProps } from 'next'
import { Dog } from 'lib/models/dog'
import http from 'lib/http/http'
import BackLink from 'components/BackLink/BackLink'
import Title from 'components/Title/Title'
import Subtitle from 'components/Subtitle/Subtitle'

type Props = { dog: Dog }

const Post: NextPage<Props> = ({ dog }) => {
  return (
    <main>
      <BackLink to="/" label="Inicio" />
      <Title>{dog.name !== 'NN' ? `${dog.name} (${dog.breed})` : dog.breed}</Title>
      <Subtitle>
        {dog.status} {dog.date} - {dog.location}
      </Subtitle>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.query
    const dog = await http<Dog>({ url: `/api/dog/${id}` })
    return {
      props: { dog },
    }
  } catch (err) {
    console.log(err)
    return {
      notFound: true,
    }
  }
}

export default Post
