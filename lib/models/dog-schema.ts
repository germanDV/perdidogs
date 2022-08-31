import mongoose from 'mongoose'

export enum Breeds {
  BASENJI = 'Basenji',
  BASSET_HOUND = 'Basset Hound',
  BEAGLE = 'Beagle',
  BICHON_FRISE = 'Bichon Frise',
  BOEROBEL = 'Boerboel',
  BOXER = 'Boxer',
  BOYERO_BERNA = 'Boyero de Berna',
  BRETON = 'Breton',
  BULLDOG = 'Bull Dog',
  BULLDOG_FRANCES = 'Bulldog Francés',
  BULLDOG_INGLES = 'Bulldog Inglés',
  BULTERRIER = 'Bull Terrier',
  CALLEJERO = 'Callejero',
  CANICHE = 'Caniche',
  CHIHUAHUA = 'Chihuahua',
  CHOWCHOW = 'Chow Chow',
  COCKER = 'Cocker',
  COLIE = 'Border Colie',
  DALMATA = 'Dalmata',
  DOBERMAN = 'Doberman',
  DOGO = 'Dogo',
  FILA_BRASILERO = 'Fila Brasilero',
  FOXTERRIER = 'Fox Terrier',
  GOLDEN_RETRIEVER = 'Golden Retriever',
  GRANDANES = 'Gran Danés',
  HUSKY_SIBERIANO = 'Husky Siberiano',
  JACK_RUSELL_TERRIER = 'Jack Rusell Terrier',
  LABRADOR = 'Labrador',
  LOBO_CHECOSLOVACO = 'Lobo Checoslovaco',
  MALTES = 'Maltés',
  MASTIN_NAPOLITANO = 'Mastín Napolitano',
  MASTIN_INGLES = 'Mastín Inglés',
  MASTIN_PIRINEO = 'Mastín Pirineo',
  MESTIZO = 'Mestizo',
  OTRO = 'otro',
  OVEJERO_ALEMAN = 'Pastor Ovejero Alemán',
  OVEJERO_AUSTRALIANO = 'Pastor Ovejero Australiano',
  OVEJERO_BELGA = 'Pastor Ovejero Belga',
  POINTER = 'Pointer',
  POMERANIA = 'Pomerania',
  POODLE = 'Poodle',
  PUG = 'Pug',
  ROTTWEILER = 'Rottweiler',
  SALCHICHA = 'Salchicha o Dachshund',
  SAN_BERNARDO = 'San Bernardo',
  SHARPEI = 'Shar Pei',
  SHIBA_INU = 'Shiba Inu',
  SHIH_TZU = 'Shih Tzu',
  SHNAUZER = 'Shnauzer',
  AMERICAN_STAFFORD = 'Stafordshire Americano',
  TERRANOVA = 'Terranova',
  YORKSHIRE = 'Yorkshire',
}

export enum DogStatus {
  LOST = 'perdido',
  FOUND = 'encontrado',
  RESOLVED = 'resuelto',
}

export function isDogStatus(s: string | string[] | undefined): s is DogStatus {
  return Object.values(DogStatus).includes(s as DogStatus)
}

export function isDogBreed(s: string | string[] | undefined): s is Breeds {
  return Object.values(Breeds).includes(s as Breeds)
}

export const MAX_PICTURES = 6

export type Dog = {
  _id: string
  gender: 'm' | 'f'
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
    required: true,
  },
  name: {
    type: String,
  },
  date: {
    type: Number,
    required: true,
  },
  color: [String],
  status: {
    type: String,
    required: true,
    index: true,
  },
  breed: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pictures: [String],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  contact: {
    type: String,
  },
})
