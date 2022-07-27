import mongoose, { ObjectId } from 'mongoose'

export type User = {
  _id: ObjectId
  name: string
  email: string
  pass: string
}

export const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    index: true,
    unique: true,
  },
  pass: String,
})

export type SignupUser = Omit<User, '_id'>
export type SigninUser = Omit<Omit<User, '_id'>, 'name'>
export type PublicUser = Omit<User, 'pass'>
export type Token = string
