import mongoose from 'mongoose'
import { conn } from 'lib/database'
import { DuplicateUserErr, UserNotFoundErr, InvalidPassword, UnauthenticatedUser } from 'lib/errors'

export type User = {
  _id: number
  name: string
  email: string
  pass: string
}

export type SignupUser = Omit<User, '_id'>

export type SigninUser = Omit<Omit<User, '_id'>, 'name'>

export type PublicUser = Omit<User, 'pass'>

export type Token = string

const DB: User[] = []

const userSchema = new mongoose.Schema({ name: 'string', email: 'string', pass: 'string' })

const UserModel = conn.model('User', userSchema)

export async function signup(user: SignupUser): Promise<string> {
  const u = new UserModel(user)
  const doc = await u.save()
  return doc._id.toString()
}

// TODO: add validations
// export async function signup(user: SignupUser): Promise<number> {
//   user.email = user.email.toLowerCase()
//
//   const duplicate = DB.find((u) => u.email === user.email)
//   if (duplicate) {
//     throw new DuplicateUserErr(`Email ${user.email} ya existe.`)
//   }
//
//   const newUser = {
//     _id: DB.length + 1,
//     ...user,
//   }
//
//   DB.push(newUser)
//   return newUser._id
// }

// TODO: add validation, proper token, and password hashing
export async function signin(creds: SigninUser): Promise<Token> {
  const user = DB.find((u) => u.email === creds.email.toLowerCase())
  if (!user) {
    throw new UserNotFoundErr(`No se ha encontrado usuario con email ${creds.email}.`)
  }

  if (user.pass !== creds.pass) {
    throw new InvalidPassword('Datos de login inválidos.')
  }

  const token: Token = `auth-token-for-user:${user._id}`
  return token
}

export async function find(id: number): Promise<PublicUser> {
  const user = DB.find((u) => u._id === id)

  if (!user) {
    throw new UnauthenticatedUser(`Usuario no autorizado.`)
  }

  const u: Partial<User> = user
  delete u.pass
  return user
}
