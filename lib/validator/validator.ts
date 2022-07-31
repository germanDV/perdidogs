interface ValidatorFunction<T = string> {
  (input: T): [boolean, string]
}

export const validateName: ValidatorFunction = (name) => {
  const min = 2
  const max = 32

  if (typeof name !== 'string' || !name.trim()) {
    return [false, 'El nombre es obligatorio.']
  }

  const n = name.trim()
  if (n.length < min || n.length > max) {
    return [false, `El nombre debe contenter entre ${min} y ${max} caracteres.`]
  }

  return [true, '']
}

export const validatePass: ValidatorFunction = (pass) => {
  const min = 12
  const max = 32

  if (typeof pass !== 'string' || !pass.trim()) {
    return [false, 'La contraseña es obligatoria.']
  }

  const p = pass.trim()
  if (p.length < min || p.length > max) {
    return [false, `La contraseña debe contenter entre ${min} y ${max} caracteres.`]
  }

  return [true, '']
}

export const validateEmail: ValidatorFunction = (email) => {
  if (typeof email !== 'string' || !email.trim()) {
    return [false, 'El email es obligatorio.']
  }

  const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  if (!emailRegexp.test(email.trim())) {
    return [false, 'Email inválido.']
  }

  return [true, '']
}
