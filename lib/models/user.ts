import { conn } from 'lib/database'
import { userSchema, User, SigninUser, SignupUser, PublicUser } from './user-schema'
import { hash, match } from 'lib/auth/pwd'
import { generate } from 'lib/auth/token'
import { validateName, validateEmail, validatePass } from 'lib/validator/validator'
import {
  DuplicateUserErr,
  InvalidCredentials,
  UnauthenticatedUser,
  BadInputError,
} from 'lib/errors'

const UserModel = conn.model('User', userSchema)

export async function signup(user: SignupUser): Promise<PublicUser> {
  const validationErrors: Record<string, string> = {}

  const [isValidName, nameError] = validateName(user.name)
  if (nameError) {
    validationErrors.name = nameError
  }

  const [isValidEmail, emailError] = validateEmail(user.email)
  if (emailError) {
    validationErrors.email = emailError
  }

  const [isValidPass, passError] = validatePass(user.pass)
  if (passError) {
    validationErrors.pass = passError
  }

  if (!isValidName || !isValidEmail || !isValidPass) {
    throw new BadInputError(JSON.stringify(validationErrors))
  }

  try {
    user.pass = await hash(user.pass)
    const u = new UserModel(user)
    const doc = await u.save()

    const pu: PublicUser = {
      _id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
    }

    return pu
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

  const u: PublicUser = {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
  }

  return u
}

export async function signin(creds: SigninUser): Promise<{ token: string; user: PublicUser }> {
  const validationErrors: Record<string, string> = {}

  const [isValidEmail, emailError] = validateEmail(creds.email)
  if (emailError) {
    validationErrors.email = emailError
  }

  const [isValidPass, passError] = validatePass(creds.pass)
  if (passError) {
    validationErrors.pass = passError
  }

  if (!isValidEmail || !isValidPass) {
    throw new BadInputError(JSON.stringify(validationErrors))
  }

  const user: User = await UserModel.findOne({ email: creds.email }).exec()
  if (!user) {
    throw new InvalidCredentials('Datos de ingreso inválidos.')
  }

  const correctPass = await match(creds.pass, user.pass)
  if (!correctPass) {
    throw new InvalidCredentials('Datos de ingreso inválidos.')
  }

  const publicUser: PublicUser = {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
  }

  const token = await generate({ sub: user._id.toString() })
  return { token, user: publicUser }
}

export async function findByEmail(email: string) {
  const user: User | undefined = await UserModel.findOne({ email }).exec()
  return user
}
