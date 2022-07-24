export class DuplicateUserErr extends Error {
  public name: string
  public message: string

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = 'DuplicateUserErr'
  }
}

export class UserNotFoundErr extends Error {
  public name: string
  public message: string

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = 'UserNotFoundErr'
  }
}

export class InvalidPassword extends Error {
  public name: string
  public message: string

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = 'InvalidPassword'
  }
}

export class UnauthenticatedUser extends Error {
  public name: string
  public message: string

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = 'UnauthenticatedUser'
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

export type AppError =
  | DuplicateUserErr
  | UserNotFoundErr
  | InvalidPassword
  | UnauthenticatedUser
  | HttpError
