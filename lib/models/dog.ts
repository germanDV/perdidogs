import mongoose, { trusted } from 'mongoose'
import dbConnect from 'lib/database'
import { BadInputError, DogNotFoundErr } from 'lib/errors'
import { dogSchema, DogStatus, Dog } from './dog-schema'
import { validateDog } from 'lib/validator/validator'
import { Filters } from 'lib/filters'

const DogModel = mongoose.models.Dog || mongoose.model('Dog', dogSchema)

export async function save(dog: Partial<Dog>): Promise<Dog> {
  const errors = validateDog(dog)
  if (errors) {
    throw new BadInputError(JSON.stringify(errors))
  }

  await dbConnect()
  const d = new DogModel(dog)
  const doc = await d.save()
  return { ...doc, _id: doc._id.toString() }
}

export async function fetchById(id: string): Promise<{ _doc: Dog }> {
  await dbConnect()

  const dog: { _doc: Dog } = await DogModel.findById(id).exec()
  if (!dog) {
    throw new DogNotFoundErr(`Perro con id ${id} no encontrado.`)
  }

  return dog
}

export async function fetchByStatus(status: DogStatus): Promise<{ _doc: Dog }[]> {
  await dbConnect()
  const dogs: { _doc: Dog }[] = await DogModel.find({ status })
  return dogs
}

export async function fetchByCreator(creatorId: string): Promise<{ _doc: Dog }[]> {
  await dbConnect()

  const dogs: { _doc: Dog }[] = await DogModel.find({
    creator: creatorId,
    status: trusted({ $not: new RegExp(DogStatus.RESOLVED) }),
  })

  return dogs
}

export async function remove(dogId: string, creatorId: string): Promise<string> {
  await dbConnect()
  const deleted = await DogModel.findOneAndDelete({ _id: dogId, creator: creatorId })
  return deleted._id
}

export async function update(dogId: string, creatorId: string, updates: Filters): Promise<Dog> {
  await dbConnect()
  const filters = { _id: dogId, creator: creatorId }
  const opts = { new: true }
  const dog = await DogModel.findOneAndUpdate(filters, updates, opts)
  return dog
}

export async function findAll(filters: Filters): Promise<Dog[]> {
  await dbConnect()
  const dogs: Dog[] = await DogModel.find(filters).sort({ date: 'desc' })
  return dogs
}

export async function stats() {
  await dbConnect()
  const { ok, count, storageSize, totalSize } = await DogModel.collection.stats()
  return { ok, count, storageSize, totalSize }
}
