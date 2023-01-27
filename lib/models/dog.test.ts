/** @jest-environment node */
import mongoose from "mongoose"
import { DogModel } from "./dog"
import { Breeds, Dog, DogStatus } from "./dog-schema"

describe("DogModel -> validation", () => {
  const goodBoy: Dog = {
    _id: new mongoose.Types.ObjectId().toString(),
    gender: "m",
    name: "Bobby",
    date: 20230127,
    color: ["white", "brown"],
    status: DogStatus.FOUND,
    breed: Breeds.BEAGLE,
    location: "Av. Córdoba 5000, CABA.",
    description: "Beagle macho blanco y marrón con collar color verde.",
    pictures: ["https://pics.io/bobby.png"],
    creator: new mongoose.Types.ObjectId().toString(),
    contact: "yo@me.io",
  }

  it("should throw error when missing descriptions", () => {
    const dog = new DogModel({ ...goodBoy, description: null })
    const err = dog.validateSync()
    expect(err.errors.description.message).toEqual("La descripción es obligatoria.")
  })

  it("should throw error when pictures are not valid URLs", () => {
    const dog = new DogModel({ ...goodBoy, pictures: ["invlaid-img-url"] })
    const err = dog.validateSync()
    expect(err.errors.pictures.message).toEqual("Adjuntar entre 1 y 6 imágenes.")
  })

  it("should throw error when including too many pictures", () => {
    const files = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const pictures = files.map((f) => `https://pics.com/${f}.png`)
    const dog = new DogModel({ ...goodBoy, pictures })
    const err = dog.validateSync()
    expect(err.errors.pictures.message).toEqual("Adjuntar entre 1 y 6 imágenes.")
  })

  it("should filter out invalid URLs", () => {
    const files = [1, 2, 3, 4, 5, 6]
    const goodPics = files.map((f) => `https://pics.com/${f}.png`)
    const dog = new DogModel({ ...goodBoy, pictures: [...goodPics, "bad-image-url.pdf"] })
    const err = dog.validateSync()
    expect(err).toBeUndefined()
  })

  it("should filter out empty string color", () => {
    const dog = new DogModel({ ...goodBoy, color: ["a_color_with_a_long_name"] })
    const err = dog.validateSync()
    expect(err.errors.color.message).toEqual("Indicar entre 1 y 3 colores.")
  })

  it("should throw is date has too few digits", () => {
    const dog = new DogModel({ ...goodBoy, date: 99_04_20 })
    const err = dog.validateSync()
    expect(err.errors.date.message).toEqual("La fecha debe contener 8 dígitos.")
  })

  it("should throw is date has too many digits", () => {
    const dog = new DogModel({ ...goodBoy, date: 1999_04_20_0 })
    const err = dog.validateSync()
    expect(err.errors.date.message).toEqual("La fecha debe contener 8 dígitos.")
  })

  it("should validate contact when present", () => {
    const dog = new DogModel({ ...goodBoy, contact: "short" })
    const err = dog.validateSync()
    expect(err.errors.contact.message).toEqual("Contacto debe contener al menos 8 caracteres.")
  })

  it("should not throw if contact is not present", () => {
    const dog = new DogModel({ ...goodBoy, contact: null })
    const err = dog.validateSync()
    expect(err).toBeUndefined()
  })
})
