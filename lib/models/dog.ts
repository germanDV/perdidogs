import { conn } from 'lib/database'
import { BadInputError, DogNotFoundErr } from 'lib/errors'
import { dogSchema, DogStatus, Dog, isDogBreed, isDogStatus } from './dog-schema'
import { validateName, validateDate, required, max, min } from 'lib/validator/validator'

const DogModel = conn.model('Dog', dogSchema)

export function validateDog(dog: Partial<Dog>): Record<string, string> | null {
  let hasErrors = false
  const validationErrors: Record<string, string> = {}

  if (dog.name) {
    const [isValidName, nameError] = validateName(dog.name)
    if (!isValidName) {
      hasErrors = true
      validationErrors.name = nameError
    }
  }

  const [isValidDate, dateError] = validateDate(dog.date || 0)
  if (!isValidDate) {
    hasErrors = true
    validationErrors.date = dateError
  }

  if (!dog.color || dog.color.length === 0) {
    hasErrors = true
    validationErrors.color = 'Debe indicar color.'
  } else {
    const invalidColor = dog.color.find((c) => !required(c) || !min(c, 4) || !max(c, 32))
    if (invalidColor) {
      hasErrors = true
      validationErrors.color = 'Debe contener entre 4 y 32 caracteres.'
    }
  }

  const loc = dog.location || ''
  if (!required(loc) || !min(loc, 4) || !max(loc, 32)) {
    hasErrors = true
    validationErrors.location = 'Debe contener entre 4 y 32 caracteres.'
  }

  const desc = dog.description || ''
  if (!required(desc) || !min(desc, 50) || !max(desc, 1_000)) {
    hasErrors = true
    validationErrors.description = 'Debe contener entre 50 y 1000 caracteres.'
  }

  if (!isDogStatus(dog.status)) {
    hasErrors = true
    validationErrors.status = 'No es una opción válida.'
  }

  if (!isDogBreed(dog.breed)) {
    hasErrors = true
    validationErrors.breed = 'No es una opción válida.'
  }

  return hasErrors ? validationErrors : null
}

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
