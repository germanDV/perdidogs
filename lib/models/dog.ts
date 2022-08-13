import { conn } from 'lib/database'
import { BadInputError, DogNotFoundErr } from 'lib/errors'
import { dogSchema, DogStatus, Dog } from './dog-schema'
import { validateDog } from 'lib/validator/validator'
import { Filters } from 'lib/filters'

const DogModel = conn.model('Dog', dogSchema)

export async function save(dog: Partial<Dog>): Promise<Dog> {
  const errors = validateDog(dog)
  if (errors) {
    throw new BadInputError(JSON.stringify(errors))
  }

  const d = new DogModel(dog)
  const doc = await d.save()
  return { ...doc, _id: doc._id.toString() }
}

export async function fetchById(id: string): Promise<Dog> {
  const dog: Dog = await DogModel.findById(id).exec()
  if (!dog) {
    throw new DogNotFoundErr(`Perro con id ${id} no encontrado.`)
  }

  return dog
}

export async function fetchByStatus(status: DogStatus): Promise<Dog[]> {
  const dogs: Dog[] = await DogModel.find({ status })
  return dogs
}

export async function fetchByCreator(creatorId: string): Promise<Dog[]> {
  const dogs: Dog[] = await DogModel.find({ creator: creatorId })
  return dogs
}

export async function remove(id: string): Promise<string> {
  const deleted = await DogModel.findByIdAndDelete(id)
  return deleted._id
}

export async function findAll(filters: Filters): Promise<Dog[]> {
  const dogs: Dog[] = await DogModel.find(filters).sort({ date: 'desc' })
  return dogs
}
