import bcrypt from 'bcrypt'

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 11

export function hash(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS)
}

export function match(candidate: string, target: string): Promise<boolean> {
  return bcrypt.compare(candidate, target)
}
