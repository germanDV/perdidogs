const ENV = process.env.NODE_ENV
const EXP = Number(process.env.AUTH_TOKEN_EXP_DAYS) || 1

const expirationSeconds = EXP * 24 * 60 * 60

export function getAuthCookie(token: string): string {
  let cookieString = `auth_token=${token}; HttpOnly; Path=/; Max-Age=${expirationSeconds}`

  if (ENV === 'production') {
    cookieString += '; Secure'
  }

  return cookieString
}
