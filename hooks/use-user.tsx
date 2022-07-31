import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { PublicUser } from 'lib/models/user-schema'
import http from 'lib/http/http'

type UserCtxType = {
  user: PublicUser | null
  signup: (name: string, email: string, pass: string) => Promise<PublicUser | null>
  signin: (email: string, pass: string) => Promise<PublicUser | null>
  signout: () => void
  loading: boolean
}

const emptyCtx: UserCtxType = {
  user: null,
  signup: () => Promise.resolve(null),
  signin: () => Promise.resolve(null),
  signout: () => {},
  loading: true,
}

const UserCtx = createContext<UserCtxType>(emptyCtx)
UserCtx.displayName = 'UserContext'

type Props = { children: React.ReactNode }

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<PublicUser | null>(emptyCtx.user)
  const [loading, setLoading] = useState(emptyCtx.loading)

  useEffect(() => {
    async function me() {
      try {
        const { user } = await http<{ user: PublicUser }>({ url: '/api/user/me' })
        setUser(user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    me()
  }, [])

  const signup = useCallback(async (name: string, email: string, pass: string) => {
    const { user } = await http<{ user: PublicUser; token: string }>({
      url: '/api/user/signup',
      method: 'POST',
      data: { name, email, pass },
    })

    setUser(user)
    return user
  }, [])

  const signin = useCallback(async (email: string, pass: string) => {
    const { user } = await http<{ user: PublicUser; token: string }>({
      url: '/api/user/signin',
      method: 'POST',
      data: { email, pass },
    })

    setUser(user)
    return user
  }, [])

  const signout = useCallback(async () => {
    await http({ url: '/api/user/signout', method: 'DELETE' })
    setUser(null)
  }, [])

  const value = useMemo(() => {
    return { user, signup, signin, signout, loading }
  }, [user, signup, signin, signout, loading])

  return <UserCtx.Provider value={value}>{children}</UserCtx.Provider>
}

export function useUser() {
  const ctx = useContext(UserCtx)
  if (!ctx) {
    throw new Error('useUser must be used within a <UserProvider>')
  }
  return ctx
}
