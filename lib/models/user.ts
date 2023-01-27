import mongoose from "mongoose"
import dbConnect from "lib/database"
import { userSchema, User, SigninUser, SignupUser, PublicUser } from "./user-schema"
import { hash, match } from "lib/auth/pwd"
import { generate } from "lib/auth/token"
import {
  DuplicateUserErr,
  InvalidCredentials,
  UnauthenticatedUser,
  BadInputError,
  UserNotFoundErr,
} from "lib/errors"

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema)

export async function signup(user: SignupUser): Promise<PublicUser> {
  try {
    user.pass = await hash(user.pass)
    await dbConnect()
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
    if ((err as { errors: any }).errors) {
      throw new BadInputError(JSON.stringify(err))
    }
    throw err
  }
}

export async function find(id: string): Promise<PublicUser> {
  await dbConnect()

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
  await dbConnect()

  const user: User = await UserModel.findOne({ email: creds.email }).exec()
  if (!user) {
    throw new InvalidCredentials("Datos de ingreso inválidos.")
  }

  const correctPass = await match(creds.pass, user.pass)
  if (!correctPass) {
    throw new InvalidCredentials("Datos de ingreso inválidos.")
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
  await dbConnect()
  const user: User | undefined = await UserModel.findOne({ email }).exec()
  return user
}

export async function changePass(userId: string, oldPass: string, newPass: string) {
  const user: User = await UserModel.findById(userId).exec()
  if (!user) {
    throw new UserNotFoundErr(`Usuario no encontrado.`)
  }

  const correctPass = await match(oldPass, user.pass)
  if (!correctPass) {
    throw new InvalidCredentials("Contraseña incorrecta.")
  }

  const filters = { _id: userId }
  const updates = { pass: await hash(newPass) }
  const opts = { new: true }

  try {
    const updated = await UserModel.findOneAndUpdate(filters, updates, opts)
    return updated
  } catch (err) {
    throw new BadInputError(JSON.stringify(err))
  }
}

export async function stats() {
  await dbConnect()
  const { ok, count, storageSize, totalSize } = await UserModel.collection.stats()
  return { ok, count, storageSize, totalSize }
}
