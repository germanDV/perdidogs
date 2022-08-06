export class DuplicateUserErr extends Error {
  public name: string
  public message: string
  public code: number

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = 'DuplicateUserErr'
    this.code = 400
  }
}

export class UserNotFoundErr extends Error {
  public name: string
  public message: string
  public code: number

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = 'UserNotFoundErr'
    this.code = 404
  }
}

export class InvalidCredentials extends Error {
  public name: string
  public message: string
  public code: number

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = 'InvalidCredentials'
    this.code = 401
  }
}

export class UnauthenticatedUser extends Error {
  public name: string
  public message: string
  public code: number

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = 'UnauthenticatedUser'
    this.code = 401
  }
}

export class BadInputError extends Error {
  public name: string
  public message: string
  public code: number

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = 'BadInputError'
    this.code = 400
  }
}

export class DogNotFoundErr extends Error {
  public name: string
  public message: string
  public code: number

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = 'DogNotFoundErr'
    this.code = 404
  }
}

export class HttpError extends Error {
  public name: string
  public message: string
  public code: number

  constructor(msg: string, name: string, code: number) {
    super(msg)
    this.message = msg
    this.name = name
    this.code = code
  }
}

export type AppError = { message: string; name: string; code: number }
