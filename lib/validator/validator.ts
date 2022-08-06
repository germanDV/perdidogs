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
