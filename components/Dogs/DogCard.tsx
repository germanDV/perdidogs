import { useRouter } from 'next/router'
import { Dog, DogStatus } from 'lib/models/dog-schema'
import { printDate } from 'lib/date'
import Pictures from 'components/Pictures/Pictures'
import styles from './Dogs.module.scss'

type Props = {
  dog: Dog
}

const DogCard = ({ dog }: Props) => {
  const router = useRouter()

  const go = () => {
    router.push(`/reportes/${dog._id}`)
  }

  return (
    <div className={styles.card} onClick={go}>
      <Pictures pictures={dog.pictures?.slice(0, 3)} />
      <div className={styles.data}>
        <div className={styles.title}>{dog.breed}</div>
        <div>
          {dog.gender === 'f' ? 'Hembra' : 'Macho'} - {dog.color}
        </div>
        <div>
          {dog.status === DogStatus.LOST ? 'Perdido' : 'Encontrado'}: {printDate(dog.date)}
        </div>
        <div>Zona: {dog.location}</div>
      </div>
    </div>
  )
}

export default DogCard
