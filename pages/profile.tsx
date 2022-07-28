import type { GetServerSideProps, NextPage } from 'next'
import Title from 'components/Title/Title'
import Subtitle from 'components/Subtitle/Subtitle'
import { PublicUser } from 'lib/models/user-schema'
import http from 'lib/http/http'

type Props = {
  user: PublicUser
  error: string
}

const Profile: NextPage<Props> = ({ user, error }) => {
  return (
    <main>
      <Title>Mi Perfil</Title>
      <Subtitle>Esta página solo es visible con autenticación</Subtitle>
      {error ? (
        <p style={{ color: '#ff0000' }}>{error}</p>
      ) : (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      )}
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const KEY = process.env.AUTH_COOKIE_KEY || ''
    const token = ctx.req.cookies[KEY] || ''

    const { user } = await http<{ user: PublicUser }>({
      url: '/api/user/me',
      headers: { Authorization: `Bearer ${token}` },
    })

    return {
      props: { user, error: '' },
    }
  } catch (err) {
    return {
      props: {
        user: null,
        error: (err as Error).message,
      },
    }
  }
}

export default Profile
