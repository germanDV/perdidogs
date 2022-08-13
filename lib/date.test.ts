/** @jest-environment node */
import { printDate } from './date'

type TestCase = [number, string]

const testCases: TestCase[] = [
  [19870806, '6 de agosto de 1987'],
  [20220420, '20 de abril de 2022'],
  [20221225, '25 de diciembre de 2022'],
  [19701102, '2 de noviembre de 1970'],
]

describe('Format date for printing', () => {
  test.each(testCases)('format date %d and print %s', (date, expected) => {
    expect(printDate(date)).toEqual(expected)
  })
})
