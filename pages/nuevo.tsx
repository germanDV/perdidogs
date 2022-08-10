import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, FormEvent, ChangeEvent } from 'react'
import { Dog, Breeds, DogStatus } from 'lib/models/dog-schema'
import { validateDog } from 'lib/validator/validator'
import BackLink from 'components/BackLink/BackLink'
import Title from 'components/Title/Title'
import Subtitle from 'components/Subtitle/Subtitle'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'

const NewDog: NextPage = () => {
  const [values, setValues] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string> | null>(null)
  const router = useRouter()
  const status = router.query.estado

  const handleNewDog = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setErrors(null)

    // Date siempre es hoy.
    const today = new Date()
    const y = today.getFullYear()
    const m = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1
    const d = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()
    const date = Number(`${y}${m}${d}`)

    const dog: Partial<Dog> = {
      status: status === 'encontrado' ? DogStatus.FOUND : DogStatus.LOST,
      name: status === 'encontrado' ? 'NN' : values.name,
      date,
      color: [values.color],
      location: values.location,
      description: values.description,
      breed: values.breed as Breeds,
    }

    // Validation.
    const errs = validateDog(dog)
    if (errs) {
      setErrors(errs)
      return
    }

    // API request.

    // Mensaje de éxito y limpiar formulario.
    console.log('Nice!')
    console.log(values)
  }

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }))
  }

  return (
    <main>
      <BackLink to="/" label="Inicio" />
      <Title>Crear</Title>
      <Subtitle>Reportar perro {status}</Subtitle>

      <form onSubmit={handleNewDog} style={{ width: 350, margin: '40px 0' }}>
        {status === 'perdido' && (
          <Input
            id="name"
            placeholder="Nombre"
            value={values?.name || ''}
            onChange={handleChange}
            error={errors?.name || ''}
          />
        )}

        {/* API recibe un array de colores, podría ser un multi select */}
        <Input
          id="color"
          placeholder="Color"
          value={values?.color || ''}
          onChange={handleChange}
          error={errors?.color || ''}
        />

        {/* Podría ser un select */}
        <Input
          id="location"
          placeholder="Lugar donde fue encontrado"
          value={values?.location || ''}
          onChange={handleChange}
          error={errors?.location || ''}
        />

        {/* Debería ser un textarea */}
        <Input
          id="description"
          placeholder="Descripción"
          value={values?.description || ''}
          onChange={handleChange}
          error={errors?.description || ''}
        />

        {/* Esto tiene que ser un select porque API define un Enum */}
        <Input
          id="breed"
          placeholder="Raza"
          value={values?.breed || ''}
          onChange={handleChange}
          error={errors?.breed || ''}
        />

        <Button type="submit" fullWidth>
          Guardar
        </Button>
      </form>
    </main>
  )
}

export default NewDog
