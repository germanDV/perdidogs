import { useState, useMemo, ChangeEvent } from 'react'
import { Dog } from 'lib/models/dog-schema'
import BreedSelect from 'components/Select/BreedSelect'
import GenderSelect from 'components/Select/GenderSelect'
import Input from 'components/Input/Input'
import DogCard from './DogCard'
import styles from './Dogs.module.scss'

type Props = {
  dogs: Dog[]
}

const Dogs = ({ dogs }: Props) => {
  const [filters, setFilters] = useState<Record<string, string>>({})

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFilters((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }))
  }

  const filteredDogs = useMemo(() => {
    return dogs.filter((d) => {
      if (filters.breed && d.breed !== filters.breed) {
        return false
      }
      if (filters.gender && d.gender !== filters.gender) {
        return false
      }
      if (filters.location && !d.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }
      return true
    })
  }, [dogs, filters.breed, filters.gender, filters.location])

  if (dogs.length === 0) {
    return <h2>No hay ningún reporte abierto.</h2>
  }

  return (
    <div>
      <div className={styles.container}>
        <h4 className={styles.h4}>FILTROS</h4>
        <div className={styles.filters}>
          <BreedSelect
            id="breed"
            value={filters?.breed || ''}
            onChange={handleChange}
            allowEmpty
            emptyLabel="-- filtrar por raza"
          />
          <GenderSelect
            id="gender"
            value={filters?.gender || ''}
            onChange={handleChange}
            allowEmpty
            emptyLabel="-- filtrar por género"
          />
          <Input
            id="location"
            placeholder="Filtrar Por Zona"
            value={filters?.location || ''}
            onChange={handleChange}
            error=""
          />
        </div>
      </div>

      <div className={styles.grid}>
        {filteredDogs.map((d) => (
          <DogCard key={d._id} dog={d} />
        ))}
      </div>
    </div>
  )
}

export default Dogs
