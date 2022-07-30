import { conn } from 'lib/database'
import { userSchema, User, SigninUser, SignupUser, PublicUser } from './user-schema'
import { DuplicateUserErr, InvalidCredentials, UnauthenticatedUser } from 'lib/errors'
import { hash, match } from 'lib/auth/pwd'
import { generate } from 'lib/auth/token'

const UserModel = conn.model('User', userSchema)

export async function signup(user: SignupUser): Promise<string> {
  try {
    user.pass = await hash(user.pass)
    const u = new UserModel(user)
    const doc = await u.save()
    return doc._id.toString()
  } catch (err) {
    if (err && (err as { code: number }).code === 11000) {
      throw new DuplicateUserErr(`Usuario con email ${user.email} ya existe.`)
    }
    throw err
  }
}

export async function find(id: string): Promise<PublicUser> {
  const user: User = await UserModel.findById(id).exec()
  if (!user) {
    throw new UnauthenticatedUser(`Usuario no autorizado.`)
  }

  const u: Partial<User> = user
  delete u.pass
  return user
}

export async function signin(creds: SigninUser): Promise<string> {
  const user: User = await UserModel.findOne({ email: creds.email }).exec()
  if (!user) {
    throw new InvalidCredentials('Datos de ingreso inválidos.')
  }

  const correctPass = await match(creds.pass, user.pass)
  if (!correctPass) {
    throw new InvalidCredentials('Datos de ingreso inválidos.')
  }

  const token = await generate({ sub: user._id.toString() })
  return token
}
