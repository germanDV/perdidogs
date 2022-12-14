import { Dog, isDogBreed, isDogStatus, MAX_PICTURES } from 'lib/models/dog-schema'

const ACCEPTABLE_IMG_FORMATS = ['jpg', 'jpeg', 'png', 'webp']

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

export const validateLocation: ValidatorFunction = (loc) => {
  if (!required(loc) || !min(loc, 4) || !max(loc, 100)) {
    return [false, 'Debe contener entre 4 y 100 caracteres.']
  }
  return [true, '']
}

export const validateDescription: ValidatorFunction = (desc) => {
  if (!required(desc) || !min(desc, 30) || !max(desc, 1_000)) {
    return [false, 'Debe contener entre 30 y 1000 caracteres.']
  }
  return [true, '']
}

export const validateColor: ValidatorFunction = (color) => {
  if (!required(color) || !min(color, 4) || !max(color, 32)) {
    return [false, 'Debe contener entre 4 y 32 caracteres.']
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
      const [isValidColor, colorError] = validateColor(c)
      if (!isValidColor) {
        hasErrors = true
        validationErrors.color = colorError
        break
      }
    }
  }

  const [isValidLoc, locError] = validateLocation(dog.location || '')
  if (!isValidLoc) {
    hasErrors = true
    validationErrors.location = locError
  }

  const [isValidDesc, descError] = validateDescription(dog.description || '')
  if (!isValidDesc) {
    hasErrors = true
    validationErrors.description = descError
  }

  // Contact is optional
  if (dog.contact) {
    if (!required(dog.contact) || !min(dog.contact, 8) || !max(dog.contact, 100)) {
      hasErrors = true
      validationErrors.contact = 'Debe contener entre 8 y 100 caracteres.'
    }
  }

  if (!isDogStatus(dog.status)) {
    hasErrors = true
    validationErrors.status = 'No es una opción válida.'
  }

  if (!isDogBreed(dog.breed)) {
    hasErrors = true
    validationErrors.breed = 'No es una opción válida.'
  }

  if (!dog.pictures || dog.pictures.length === 0) {
    hasErrors = true
    validationErrors.pictures = 'Al menos una foto es obligatoria.'
  } else if (dog.pictures.length > MAX_PICTURES) {
    hasErrors = true
    validationErrors.pictures = `Máximo ${MAX_PICTURES} fotos.`
  }

  return hasErrors ? validationErrors : null
}

export function isValidImgURL(url: string): boolean {
  if (!url || typeof url !== 'string' || url.trim().length === 0 || !url.startsWith('https://')) {
    return false
  }

  const extension = url.split('.').pop() || ''
  if (!ACCEPTABLE_IMG_FORMATS.includes(extension.toLowerCase())) {
    return false
  }

  return true
}
