export enum Breeds {
  LABRADOR = 'labrador',
  DOGO = 'dogo',
  CANICHE = 'caniche',
  MEZCLA = 'mezcla',
  OTRO = 'otro',
}

export enum DogStatus {
  LOST = 'perdido',
  FOUND = 'encontrado',
}

export function isDogStatus(s: string | string[] | undefined): s is DogStatus {
  return Object.values(DogStatus).includes(s as DogStatus)
}

export type Dog = {
  id: number
  date: number
  status: DogStatus
  breed: Breeds
  location: string
  description: string
}

const DB: Dog[] = [
  {
    id: 1,
    date: 20220716,
    location: 'Villa Crespo',
    status: DogStatus.LOST,
    breed: Breeds.CANICHE,
    description: '',
  },
  {
    id: 2,
    date: 20220717,
    location: 'Palermo',
    status: DogStatus.LOST,
    breed: Breeds.OTRO,
    description: '',
  },
  {
    id: 3,
    date: 20220718,
    location: 'Chacarita',
    status: DogStatus.FOUND,
    breed: Breeds.MEZCLA,
    description: '',
  },
]

export async function fetchByStatus(status: DogStatus): Promise<Dog[]> {
  return DB.filter((d) => d.status === status)
}

export async function fetchById(id: number): Promise<Dog | undefined> {
  return DB.find((d) => d.id === id)
}
