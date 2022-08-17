import { conn } from '../lib/database'
import { dogSchema } from '../lib/models/dog-schema'
import { userSchema } from '../lib/models/user-schema'
import { DUMMY_USERS } from './dummy-users'
import { DUMMY_DOGS } from './dummy-dogs'

export async function run() {
  console.log('Comenzando la inserción de información en la base de datos')
  console.log(`Vamos a crear ${DUMMY_USERS.length} usuarios y ${DUMMY_DOGS.length} perros`)

  const UserModel = conn.model('User', userSchema)
  const DogModel = conn.model('Dog', dogSchema)
  console.log('Modelos creados')

  console.log()
  console.log('Creando usuarios')

  const u1 = new UserModel(DUMMY_USERS[0])
  const elliot = await u1.save()
  console.log(`Usuario ${u1.name} creado exitodamente:`)
  console.log(`\t${elliot.email} (pass: mr_robot_403)`)
  console.log()

  const u2 = new UserModel(DUMMY_USERS[1])
  const darlene = await u2.save()
  console.log(`Usuario ${u2.name} creado exitodamente:`)
  console.log(`\t${darlene.email} (pass: mr_robot_403)`)
  console.log()

  console.log('Creando perros')
  let counter = 0
  for (const sampleDog of DUMMY_DOGS) {
    const creator = counter <= 2 ? elliot : darlene
    counter++
    const d = new DogModel({ ...sampleDog, creator: creator._id })
    const dog = await d.save()
    console.log('Perro creado exitosamente')
    console.log(`\t- ID: ${dog._id}`)
    console.log(`\t- reportado por: ${creator.email}`)
    console.log()
  }
}

run()
  .then(() => {
    console.log('Leesto.')
    process.exit(0)
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
