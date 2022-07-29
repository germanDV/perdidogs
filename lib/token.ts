import { V4 } from 'paseto'

const PRIV_KEY = process.env.PASETO_PRIVATE_KEY || ''
const PUBL_KEY = process.env.PASETO_PUBLIC_KEY || ''
const EXP = process.env.AUTH_TOKEN_EXP_DAYS || 1

export async function generate(claims: Record<string, string>): Promise<string> {
  const token = await V4.sign(claims, PRIV_KEY, { expiresIn: `${EXP}d`, iat: true })
  return token
}

export async function verify(token: string): Promise<object> {
  const payload = await V4.verify(token, PUBL_KEY)
  return payload
}

export async function generateKeys() {
  const keys = await V4.generateKey('public', { format: 'paserk' })
  return keys
}
