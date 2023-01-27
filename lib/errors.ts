export interface AppError {
  message: string
  name: string
  code: number
}

export class DuplicateUserErr extends Error implements AppError {
  public name: string
  public message: string
  public code: number

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = "DuplicateUserErr"
    this.code = 400
  }
}

export class UserNotFoundErr extends Error implements AppError {
  public name: string
  public message: string
  public code: number

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = "UserNotFoundErr"
    this.code = 404
  }
}

export class InvalidCredentials extends Error implements AppError {
  public name: string
  public message: string
  public code: number

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = "InvalidCredentials"
    this.code = 401
  }
}

export class UnauthenticatedUser extends Error implements AppError {
  public name: string
  public message: string
  public code: number

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = "UnauthenticatedUser"
    this.code = 401
  }
}

export class BadInputError extends Error implements AppError {
  public name: string
  public message: string
  public code: number

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = "BadInputError"
    this.code = 400
  }
}

export class UpdateNotAllowed extends Error implements AppError {
  public name: string
  public message: string
  public code: number

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = "UpdateNotAllowed"
    this.code = 400
  }
}

export class DogNotFoundError extends Error implements AppError {
  public name: string
  public message: string
  public code: number

  constructor(msg: string) {
    super(msg)
    this.message = msg
    this.name = "DogNotFoundErr"
    this.code = 404
  }
}

export class HttpError extends Error implements AppError {
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

export function isAppError(error: unknown): error is AppError {
  return (
    error instanceof DuplicateUserErr ||
    error instanceof UserNotFoundErr ||
    error instanceof InvalidCredentials ||
    error instanceof UnauthenticatedUser ||
    error instanceof UnauthenticatedUser ||
    error instanceof DogNotFoundError ||
    error instanceof HttpError ||
    error instanceof UpdateNotAllowed
  )
}
