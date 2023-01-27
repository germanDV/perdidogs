import { isValidImgURL } from "lib/validator/validator"
import mongoose from "mongoose"

export const MAX_PICTURES = 6

export enum Breeds {
  BASENJI = "Basenji",
  BASSET_HOUND = "Basset Hound",
  BEAGLE = "Beagle",
  BICHON_FRISE = "Bichon Frise",
  BOEROBEL = "Boerboel",
  BOXER = "Boxer",
  BOYERO_BERNA = "Boyero de Berna",
  BRETON = "Breton",
  BULLDOG = "Bull Dog",
  BULLDOG_FRANCES = "Bulldog Francés",
  BULLDOG_INGLES = "Bulldog Inglés",
  BULTERRIER = "Bull Terrier",
  CALLEJERO = "Callejero",
  CANICHE = "Caniche",
  CHIHUAHUA = "Chihuahua",
  CHOWCHOW = "Chow Chow",
  COCKER = "Cocker",
  COLIE = "Border Colie",
  DALMATA = "Dalmata",
  DOBERMAN = "Doberman",
  DOGO = "Dogo",
  FILA_BRASILERO = "Fila Brasilero",
  FOXTERRIER = "Fox Terrier",
  GOLDEN_RETRIEVER = "Golden Retriever",
  GRANDANES = "Gran Danés",
  HUSKY_SIBERIANO = "Husky Siberiano",
  JACK_RUSELL_TERRIER = "Jack Rusell Terrier",
  LABRADOR = "Labrador",
  LOBO_CHECOSLOVACO = "Lobo Checoslovaco",
  MALTES = "Maltés",
  MASTIN_NAPOLITANO = "Mastín Napolitano",
  MASTIN_INGLES = "Mastín Inglés",
  MASTIN_PIRINEO = "Mastín Pirineo",
  MESTIZO = "Mestizo",
  OTRO = "otro",
  OVEJERO_ALEMAN = "Pastor Ovejero Alemán",
  OVEJERO_AUSTRALIANO = "Pastor Ovejero Australiano",
  OVEJERO_BELGA = "Pastor Ovejero Belga",
  POINTER = "Pointer",
  POMERANIA = "Pomerania",
  POODLE = "Poodle",
  PUG = "Pug",
  ROTTWEILER = "Rottweiler",
  SALCHICHA = "Salchicha o Dachshund",
  SAN_BERNARDO = "San Bernardo",
  SHARPEI = "Shar Pei",
  SHIBA_INU = "Shiba Inu",
  SHIH_TZU = "Shih Tzu",
  SHNAUZER = "Shnauzer",
  AMERICAN_STAFFORD = "Stafordshire Americano",
  TERRANOVA = "Terranova",
  YORKSHIRE = "Yorkshire",
}

export function isDogBreed(s: string | string[] | undefined): s is Breeds {
  if (typeof s !== "string") return false
  return Object.values(Breeds)
    .map((b) => b.toLowerCase())
    .includes(s.toLowerCase() as Breeds)
}

export enum DogStatus {
  LOST = "perdido",
  FOUND = "encontrado",
  RESOLVED = "resuelto",
}

export function isDogStatus(s: string | string[] | undefined): s is DogStatus {
  return Object.values(DogStatus).includes(s as DogStatus)
}

export type Dog = {
  _id: string
  gender: "m" | "f"
  name: string
  date: number
  color: string[]
  status: DogStatus
  breed: Breeds
  location: string
  description: string
  pictures?: string[]
  creator: string
  contact?: string
}

export const dogSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: [true, "Género es obligatorio."],
    trim: true,
    set: (v: string) => v.toLowerCase(),
    enum: { values: ["m", "f"], message: "El género debe ser `m` o `f`." },
  },
  name: {
    type: String,
    trim: true,
    minLength: [2, "El nombre debe contener al menos 2 caracteres."],
    maxLength: [32, "El nombre no puede contener más de 32 caracteres."],
  },
  date: {
    type: Number,
    required: [true, "La fecha es obligatoria."],
    min: [1000_00_00, "La fecha debe contener 8 dígitos."],
    max: [9999_99_99, "La fecha debe contener 8 dígitos."],
  },
  color: {
    type: [String],
    trim: true,
    required: [true, "El color es obligatorio."],
    set: (values: string[]) =>
      values.filter((v) => v.length >= 1 && v.length <= 12).map((v) => v.toLowerCase()),
    validate: {
      validator: (colors: string[]) => {
        if (colors.length < 1 || colors.length > 3) {
          return false
        }
        return true
      },
      message: () => `Indicar entre 1 y 3 colores.`,
    },
  },
  pictures: {
    type: [String],
    required: [true, "Obligatorio adjuntar imágen."],
    set: (values: string[]) => values.filter((v) => isValidImgURL(v)),
    validate: {
      validator: (pics: string[]) => {
        if (pics.length < 1 || pics.length > MAX_PICTURES) {
          return false
        }
        return true
      },
      message: () => `Adjuntar entre 1 y ${MAX_PICTURES} imágenes.`,
    },
  },
  status: {
    type: String,
    trim: true,
    required: [true, "Estado es obligatorio."],
    validate: {
      validator: (v: string) => isDogStatus(v),
      message: (props: { value: string }) => `Estado inválido (${props.value}).`,
    },
    index: true,
  },
  breed: {
    type: String,
    trim: true,
    required: [true, "La raza es obligatoria."],
    validate: {
      validator: (v: string) => isDogBreed(v),
      message: (props: { value: string }) => `Raza inválida (${props.value}).`,
    },
  },
  location: {
    type: String,
    trim: true,
    required: [true, "El lugar es obligatorio."],
    minLength: [4, "Lugar debe contener al menos 4 caracteres."],
    maxLength: [100, "Lugar no debe contener más de 100 caracteres."],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "La descripción es obligatoria."],
    minLength: [10, "La descripción debe contener al menos 10 caracteres."],
    maxLength: [1_000, "La descripción no debe contener más de 1000 caracteres."],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  contact: {
    type: String,
    trim: true,
    minLength: [8, "Contacto debe contener al menos 8 caracteres."],
    maxLength: [100, "Contacto no debe contener más de 100 caracteres."],
  },
})
