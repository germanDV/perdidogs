import * as jose from 'jose'

const JOSE_PUBL_KEY = process.env.JOSE_PUBL_KEY || '{}'
const JOSE_PRIV_KEY = process.env.JOSE_PRIV_KEY || '{}'
const EXP = process.env.AUTH_TOKEN_EXP_DAYS || 1
const ALG = 'ES256'

export async function generate(claims: Record<string, string>): Promise<string> {
  const key = await jose.importJWK(JSON.parse(JOSE_PRIV_KEY), ALG)

  const token = await new jose.SignJWT(claims)
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(`${EXP}d`)
    .sign(key)

  return token
}

export async function verify(token: string): Promise<object> {
  const key = await jose.importJWK(JSON.parse(JOSE_PUBL_KEY), ALG)
  const { payload, protectedHeader } = await jose.jwtVerify(token, key)

  if (protectedHeader.alg !== ALG) {
    throw new Error('Mismatched token alg.')
  }

  return payload
}

export async function keys() {
  const { publicKey, privateKey } = await jose.generateKeyPair(ALG)
  const privateJwk = await jose.exportJWK(privateKey)
  const publicJwk = await jose.exportJWK(publicKey)
  return { publicJwk, privateJwk }
}
