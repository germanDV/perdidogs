/**
 * Returns a function that generates autoincrement ids.
 *
 * @example
 * ```
 * const generateId = idGenerator()
 * generateId() // -> '1'
 * generateId() // -> '2'
 * ```
 */
export function idGenerator() {
  let id = 0
  return () => {
    id++
    return id.toString()
  }
}
