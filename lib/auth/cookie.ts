const ENV = process.env.NODE_ENV
const EXP = Number(process.env.AUTH_TOKEN_EXP_DAYS) || 1

const expirationSeconds = EXP * 24 * 60 * 60

export function getAuthCookie(token: string): string {
  let cookieString = `auth_token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${expirationSeconds}`

  if (ENV === 'production') {
    cookieString += '; Secure'
  }

  return cookieString
}

export function expireCookie(): string {
  let cookieString =
    'auth_token=perdidogs_user_signed_out; HttpOnly; Path=/; SameSite=Strict; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT'

  if (ENV === 'production') {
    cookieString += '; Secure'
  }

  return cookieString
}
