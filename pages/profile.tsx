import type { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import Title from 'components/Title/Title'
import Subtitle from 'components/Subtitle/Subtitle'
import { PublicUser } from 'lib/models/user-schema'
import http from 'lib/http/http'

type Props = {
  user: PublicUser
  error: string
}

const Profile: NextPage<Props> = ({ user, error }) => {
  const [clientUser, setClientUser] = useState<PublicUser>()

  const fetchUser = async () => {
    try {
      const data = await http<{ user: PublicUser }>({ url: '/api/user/me' })
      setClientUser(data.user)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <main>
      <Title>Mi Perfil</Title>
      <Subtitle>Esta página solo es visible con autenticación</Subtitle>
      {error ? (
        <p style={{ color: '#ff0000' }}>{error}</p>
      ) : (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      )}

      <div style={{ border: '1px solid black', marginTop: 20, width: 350 }}>
        <h4>Fetch client-side:</h4>
        <button onClick={fetchUser}>fetch</button>
        <pre>{JSON.stringify(clientUser, null, 2)}</pre>
      </div>
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
