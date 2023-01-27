const ACCEPTABLE_IMG_FORMATS = ["jpg", "jpeg", "png", "webp"]

interface ValidatorFunction<T = string> {
  (input: T): [boolean, string]
}

export const required = (input: string) => {
  return input && input.trim()
}

export const min = (input: string | number, len: number) => {
  if (typeof input === "string") {
    return input.trim().length >= len
  }
  if (typeof input === "number") {
    return input >= len
  }
  return false
}

export const max = (input: string | number, len: number) => {
  if (typeof input === "string") {
    return input.length <= len
  }
  if (typeof input === "number") {
    return input <= len
  }
  return false
}

export const validatePass: ValidatorFunction = (pass) => {
  if (!required(pass)) {
    return [false, "La contraseña es obligatoria."]
  }
  if (!min(pass, 12) || !max(pass, 32)) {
    return [false, "La contraseña debe contenter entre 12 y 32 caracteres."]
  }
  return [true, ""]
}

export const validateEmail: ValidatorFunction = (email) => {
  if (!required(email)) {
    return [false, "El email es obligatorio."]
  }

  const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  if (!emailRegexp.test(email.trim())) {
    return [false, "Email inválido."]
  }

  return [true, ""]
}

export function isValidImgURL(url: string): boolean {
  if (!url || typeof url !== "string" || url.trim().length === 0 || !url.startsWith("https://")) {
    return false
  }

  const extension = url.split(".").pop() || ""
  if (!ACCEPTABLE_IMG_FORMATS.includes(extension.toLowerCase())) {
    return false
  }

  return true
}
