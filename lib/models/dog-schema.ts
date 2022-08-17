import mongoose from 'mongoose'

export enum Breeds {
  LABRADOR = 'labrador',
  DOGO = 'dogo',
  CANICHE = 'caniche',
  CALLEJERO = 'callejero',
  OTRO = 'otro',
}

export enum DogStatus {
  LOST = 'perdido',
  FOUND = 'encontrado',
  RESOLVED = 'resuelto',
}

export function isDogStatus(s: string | string[] | undefined): s is DogStatus {
  return Object.values(DogStatus).includes(s as DogStatus)
}

export function isDogBreed(s: string | string[] | undefined): s is Breeds {
  return Object.values(Breeds).includes(s as Breeds)
}

export const MAX_PICTURES = 6

export type Dog = {
  _id: string
  gender: 'm' | 'f'
  name: string
  date: number
  color: string[]
  status: DogStatus
  breed: Breeds
  location: string
  description: string
  pictures?: string[]
  creator: string
  contact?: string
}

export const dogSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  date: {
    type: Number,
    required: true,
  },
  color: [String],
  status: {
    type: String,
    required: true,
    index: true,
  },
  breed: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pictures: [String],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  contact: {
    type: String,
  },
})
