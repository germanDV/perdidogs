import { validateName, validatePass, validateEmail, validateDate } from './validator'

type TestCase = [string, [boolean, string]]

const nameTestCases: TestCase[] = [
  ['', [false, 'El nombre es obligatorio.']],
  ['   ', [false, 'El nombre es obligatorio.']],
  ['a', [false, 'El nombre debe contenter entre 2 y 32 caracteres.']],
  [' a  ', [false, 'El nombre debe contenter entre 2 y 32 caracteres.']],
  ['Ana', [true, '']],
  ['Ana Stanley', [true, '']],
  [
    'This is a name that is longer than what we allow',
    [false, 'El nombre debe contenter entre 2 y 32 caracteres.'],
  ],
  ['Mr. Robot', [true, '']],
  ['Chung-Lee', [true, '']],
  ['Matador11', [true, '']],
  ['María', [true, '']],
]

describe('validateName', () => {
  test.each(nameTestCases)('validates name "%s"', (name, expected) => {
    expect(validateName(name)).toEqual(expected)
  })
})

const passTestCases: TestCase[] = [
  ['', [false, 'La contraseña es obligatoria.']],
  ['   ', [false, 'La contraseña es obligatoria.']],
  ['1234567890', [false, 'La contraseña debe contenter entre 12 y 32 caracteres.']],
  ['1234abcdefg', [false, 'La contraseña debe contenter entre 12 y 32 caracteres.']],
  ['1234abcdefgh', [true, '']],
  ['_1234abC*efgh', [true, '']],
  ['evaichah5Vooyeop', [true, '']],
  ['shauyahLes0EelooRoghi1xahcahZ^ee', [true, '']],
  ['   ab    2', [false, 'La contraseña debe contenter entre 12 y 32 caracteres.']],
]

describe('validatePass', () => {
  test.each(passTestCases)('validates password "%s"', (pass, expected) => {
    expect(validatePass(pass)).toEqual(expected)
  })
})

const emailTestCases: TestCase[] = [
  ['', [false, 'El email es obligatorio.']],
  ['    ', [false, 'El email es obligatorio.']],
  ['lol', [false, 'Email inválido.']],
  ['lol.io', [false, 'Email inválido.']],
  ['lol@omg', [false, 'Email inválido.']],
  ['che@gueva.ra', [true, '']],
  ['homer.simpson@fox.tv', [true, '']],
  ['hi@debian.org', [true, '']],
  ['a@b.cd', [true, '']],
  ['under_score@domain.tld', [true, '']],
  ['1234@domain.tld', [true, '']],
]

describe('validateEmail', () => {
  test.each(emailTestCases)('validates email "%s"', (email, expected) => {
    expect(validateEmail(email)).toEqual(expected)
  })
})

type DateTestCase = [number, [boolean, string]]

const dateTestCases: DateTestCase[] = [
  [0, [false, 'La fecha debe contener 8 dígitos.']],
  [202209031, [false, 'La fecha debe contener 8 dígitos.']],
  [220806, [false, 'La fecha debe contener 8 dígitos.']],
  [20220806, [true, '']],
]

describe('validateDate', () => {
  test.each(dateTestCases)('validates date "%s"', (date, expected) => {
    expect(validateDate(date)).toEqual(expected)
  })
})
