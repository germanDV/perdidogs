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
}

export function isDogStatus(s: string | string[] | undefined): s is DogStatus {
  return Object.values(DogStatus).includes(s as DogStatus)
}

export function isDogBreed(s: string | string[] | undefined): s is Breeds {
  return Object.values(Breeds).includes(s as Breeds)
}

export type Dog = {
  _id: string
  name: string
  date: number
  color: string[]
  status: DogStatus
  breed: Breeds
  location: string
  description: string
  pictures?: string[]
  creator: string
}

export const dogSchema = new mongoose.Schema({
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
})
