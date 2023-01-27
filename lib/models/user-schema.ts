import mongoose, { ObjectId } from "mongoose"

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Nombre es obligatorio."],
    minLength: [2, "Nombre debe contener al menos 2 caracteres."],
    maxLength: [32, "Nombre no puede contener más de 32 caracteres"],
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: [true, "email es obligatorio."],
    trim: true,
    set: (v: string) => v.toLowerCase(),
    validate: {
      validator: (v: string) => emailRegexp.test(v),
      message: "email inválido.",
    },
  },
  pass: {
    type: String,
    required: [true, "contraseña es obligatoria."],
    minLength: [8, "Contraseña debe contener al menos 8 caracteres."],
    maxLength: [32, "Contraseña no puede contener más de 32 caracteres."],
  },
})

export type User = {
  _id: ObjectId
  name: string
  email: string
  pass: string
}

export type SignupUser = Omit<User, "_id">
export type SigninUser = Omit<Omit<User, "_id">, "name">
export type PublicUser = Omit<Omit<User, "_id">, "pass"> & { _id: string }
