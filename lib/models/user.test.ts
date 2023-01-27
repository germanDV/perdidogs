/** @jest-environment node */
import { UserModel } from "./user"

describe("UserModel -> validation", () => {
  it("should throw error when name is missing", () => {
    const u = new UserModel({ email: "jane@aol.net", pass: "abcd1234" })
    const err = u.validateSync()
    expect(err.errors.name.message).toEqual("Nombre es obligatorio.")
  })

  it("should throw error if password is too short", () => {
    const u = new UserModel({ name: "Jane", email: "jane@aol.net", pass: "abc123" })
    const err = u.validateSync()
    expect(err.errors.pass.message).toEqual("Contraseña debe contener al menos 8 caracteres.")
  })

  it("should throw error if password is too long", () => {
    const pass = "lorem ipsum dolor sit amet non consecut"
    const u = new UserModel({ name: "Jane", email: "jane@aol.net", pass })
    const err = u.validateSync()
    expect(err.errors.pass.message).toEqual("Contraseña no puede contener más de 32 caracteres.")
  })

  it("should throw an error if email is missing", () => {
    const u = new UserModel({ name: "Jane", pass: "abcd123456789" })
    const err = u.validateSync()
    expect(err.errors.email.message).toEqual("email es obligatorio.")
  })

  it("should throw an error if email is invalid", () => {
    const u = new UserModel({ name: "Jane", pass: "abcd1234", email: "no-an-email@wtf" })
    const err = u.validateSync()
    expect(err.errors.email.message).toEqual("email inválido.")
  })

  it("should not throw for a valid user", () => {
    const u = new UserModel({ name: "Jane", email: "jane@aol.net", pass: "abcd123456789" })
    const err = u.validateSync()
    expect(err).toBeUndefined()
  })
})
