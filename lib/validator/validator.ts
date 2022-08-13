import { Dog, isDogBreed, isDogStatus } from 'lib/models/dog-schema'

interface ValidatorFunction<T = string> {
  (input: T): [boolean, string]
}

export const required = (input: string) => {
  return input && input.trim()
}

export const min = (input: string | number, len: number) => {
  if (typeof input === 'string') {
    return input.trim().length >= len
  }
  if (typeof input === 'number') {
    return input >= len
  }
  return false
}

export const max = (input: string | number, len: number) => {
  if (typeof input === 'string') {
    return input.length <= len
  }
  if (typeof input === 'number') {
    return input <= len
  }
  return false
}

export const validateName: ValidatorFunction = (name) => {
  if (!required(name)) {
    return [false, 'El nombre es obligatorio.']
  }
  if (!min(name, 2) || !max(name, 32)) {
    return [false, 'El nombre debe contenter entre 2 y 32 caracteres.']
  }
  return [true, '']
}

export const validatePass: ValidatorFunction = (pass) => {
  if (!required(pass)) {
    return [false, 'La contraseña es obligatoria.']
  }
  if (!min(pass, 12) || !max(pass, 32)) {
    return [false, 'La contraseña debe contenter entre 12 y 32 caracteres.']
  }
  return [true, '']
}

export const validateEmail: ValidatorFunction = (email) => {
  if (!required(email)) {
    return [false, 'El email es obligatorio.']
  }

  const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  if (!emailRegexp.test(email.trim())) {
    return [false, 'Email inválido.']
  }

  return [true, '']
}

export const validateDate: ValidatorFunction<number> = (date) => {
  if (Number.isNaN(+date)) {
    return [false, 'La fecha debe ser un número.']
  }
  if (!min(date, 10000000) || !max(date, 99999999)) {
    return [false, 'La fecha debe contener 8 dígitos.']
  }
  return [true, '']
}

export const validateGender: ValidatorFunction = (gender) => {
  if (!gender || !['m', 'f'].includes(gender)) {
    return [false, 'El género debe ser "m" o "f".']
  }
  return [true, '']
}

export function validateDog(dog: Partial<Dog>): Record<string, string> | null {
  let hasErrors = false
  const validationErrors: Record<string, string> = {}

  const [isValidName, nameError] = validateName(dog.name || '')
  if (!isValidName) {
    hasErrors = true
    validationErrors.name = nameError
  }

  const [isValidDate, dateError] = validateDate(dog.date || 0)
  if (!isValidDate) {
    hasErrors = true
    validationErrors.date = dateError
  }

  const [isValidGender, genderError] = validateGender(dog.gender || '')
  if (!isValidGender) {
    hasErrors = true
    validationErrors.gender = genderError
  }

  if (!dog.color || dog.color.length === 0) {
    hasErrors = true
    validationErrors.color = 'Debe indicar color.'
  } else {
    for (const c of dog.color) {
      if (!required(c) || !min(c, 4) || !max(c, 32)) {
        hasErrors = true
        validationErrors.color = 'Debe contener entre 4 y 32 caracteres.'
        break
      }
    }
  }

  const loc = dog.location || ''
  if (!required(loc) || !min(loc, 4) || !max(loc, 100)) {
    hasErrors = true
    validationErrors.location = 'Debe contener entre 4 y 100 caracteres.'
  }

  const desc = dog.description || ''
  if (!required(desc) || !min(desc, 30) || !max(desc, 1_000)) {
    hasErrors = true
    validationErrors.description = 'Debe contener entre 30 y 1000 caracteres.'
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
