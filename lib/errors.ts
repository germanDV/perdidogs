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

export type AppError = DuplicateUserErr | UserNotFoundErr | InvalidPassword | UnauthenticatedUser
