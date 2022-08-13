import { validateDate } from 'lib/validator/validator'

export function printDate(date: number): string {
  const [isValid, error] = validateDate(date)
  if (!isValid) {
    return error
  }

  const y = Math.round(date / 10000)
  const m = Math.round((date % 10000) / 100)
  const d = date % 100

  const f = new Date(y, m - 1, d)
  return f.toLocaleString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
}
