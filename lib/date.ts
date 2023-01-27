const min = (input: string | number, len: number) => {
  if (typeof input === "string") {
    return input.trim().length >= len
  }
  if (typeof input === "number") {
    return input >= len
  }
  return false
}

const max = (input: string | number, len: number) => {
  if (typeof input === "string") {
    return input.length <= len
  }
  if (typeof input === "number") {
    return input <= len
  }
  return false
}

const validateDate = (date: number): [boolean, string] => {
  if (Number.isNaN(+date)) {
    return [false, "La fecha debe ser un número."]
  }
  if (!min(date, 10000000) || !max(date, 99999999)) {
    return [false, "La fecha debe contener 8 dígitos."]
  }
  return [true, ""]
}

export function printDate(date: number): string {
  const [isValid, error] = validateDate(date)
  if (!isValid) {
    return error
  }

  const y = Math.round(date / 10000)
  const m = Math.round((date % 10000) / 100)
  const d = date % 100

  const f = new Date(y, m - 1, d)
  return f.toLocaleString("es-AR", { day: "numeric", month: "long", year: "numeric" })
}
