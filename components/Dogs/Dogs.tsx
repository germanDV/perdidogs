import { Dog } from 'lib/models/dog-schema'
import DogCard from './DogCard'
import styles from './Dogs.module.scss'

type Props = {
  dogs: Dog[]
}

const Dogs = ({ dogs }: Props) => {
  if (dogs.length === 0) {
    return <h2>No hay ningún reporte abierto.</h2>
  }

  return (
    <div className={styles.grid}>
      {dogs.map((d) => (
        <DogCard key={d._id} dog={d} />
      ))}
    </div>
  )
}

export default Dogs
