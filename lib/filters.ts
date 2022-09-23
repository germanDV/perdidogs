import { trusted } from 'mongoose'
import { max, validateDate } from 'lib/validator/validator'
import { isDogStatus, isDogBreed, DogStatus } from 'lib/models/dog-schema'

export type Filters = Record<
  string,
  string | string[] | RegExp | Record<string, string | number | string[]>
>

export function buildFilters(
  query: Partial<{
    [key: string]: string | string[]
  }>
): Filters {
  const filters: Filters = {}

  if (query.status && isDogStatus(query.status)) {
    filters.status = query.status
  } else {
    // We don't want `resolved` cases.
    filters.status = trusted({ $in: [DogStatus.LOST, DogStatus.FOUND] })
  }

  if (query.breed && isDogBreed(query.breed)) {
    filters.breed = query.breed
  }

  if (
    query.gender &&
    typeof query.gender === 'string' &&
    ['m', 'f'].includes(query.gender.toLowerCase())
  ) {
    filters.gender = query.gender.toLowerCase()
  }

  if (query.color && typeof query.color === 'string' && max(query.color, 32)) {
    filters.color = trusted({ $in: [query.color.trim().toLowerCase()] })
  }

  if (query.location && typeof query.location === 'string' && max(query.location, 100)) {
    filters.location = new RegExp(query.location.trim(), 'i')
  }

  if (query.from) {
    const [isValidDate] = validateDate(+query.from)
    if (isValidDate) {
      filters.date = trusted({ $gte: +query.from })
    }
  }

  console.log(filters)
  return filters
}
