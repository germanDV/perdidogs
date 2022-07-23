export enum Breeds {
  LABRADOR = 'labrador',
  DOGO = 'dogo',
  CANICHE = 'caniche',
  CALLEJERO = 'callejero',
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
  _id: number
  name: string
  date: number
  status: DogStatus
  breed: Breeds
  location: string
  description: string
  pictures?: string[]
}

const DB: Dog[] = [
  {
    _id: 1,
    name: 'Jasmín',
    date: 20220716,
    location: 'Villa Crespo',
    status: DogStatus.LOST,
    breed: Breeds.CANICHE,
    description: '',
    pictures: [
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.hqEWAoUOQpoPWce5AVrP4wHaE7%26pid%3DApi&f=1',
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP._ABh8SZndtBPaKFeQpxY0wHaE8%26pid%3DApi&f=1',
    ],
  },
  {
    _id: 2,
    name: 'Nicolás',
    date: 20220717,
    location: 'Palermo',
    status: DogStatus.LOST,
    breed: Breeds.OTRO,
    description: '',
    pictures: [
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.aGWCJrynvAgy1oF7CvoVOgHaHa%26pid%3DApi&f=1',
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.XZ25Dfb1kYr-HtN0g6paRgHaFj%26pid%3DApi&f=1',
    ],
  },
  {
    _id: 3,
    name: 'NN',
    date: 20220718,
    location: 'Chacarita',
    status: DogStatus.FOUND,
    breed: Breeds.CALLEJERO,
    description: '',
    pictures: ['https://saaribampo.files.wordpress.com/2014/12/img_0910.jpg?w=1280&h=1468'],
  },
  {
    _id: 4,
    name: 'Benjie',
    date: 20220717,
    location: 'San Telmo',
    status: DogStatus.LOST,
    breed: Breeds.LABRADOR,
    description: '',
    pictures: [
      'https://i.pinimg.com/originals/5a/df/15/5adf15b2d5e6e3c737028098c20af172.jpg',
      'https://dogsandcatshq.com/wp-content/uploads/2020/08/labrador-retriever-4446566_1920-1536x1152.jpg',
      'http://tjbishopfineart.com/pics/corgi-labrador.jpg',
    ],
  },
  {
    _id: 5,
    name: 'NN',
    date: 20220718,
    location: 'San Telmo',
    status: DogStatus.FOUND,
    breed: Breeds.CALLEJERO,
    description: '',
  },
]

export async function fetchByStatus(status: DogStatus): Promise<Dog[]> {
  return DB.filter((d) => d.status === status)
}

export async function fetchById(id: number): Promise<Dog | undefined> {
  return DB.find((d) => d._id === id)
}

export async function save(dog: Omit<Dog, '_id'>): Promise<number> {
  const newDog = { _id: DB.length + 1, ...dog }
  DB.push(newDog)
  return newDog._id
}
