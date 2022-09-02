import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, FormEvent, ChangeEvent } from 'react'
import { Dog, Breeds, DogStatus } from 'lib/models/dog-schema'
import { validateDog } from 'lib/validator/validator'
import http, { getFullURL } from 'lib/http/http'
import BackLink from 'components/BackLink/BackLink'
import Title from 'components/Title/Title'
import Subtitle from 'components/Subtitle/Subtitle'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import Alert, { Categories } from 'components/Alert/Alert'
import BreedSelect from 'components/Select/BreedSelect'
import GenderSelect from 'components/Select/GenderSelect'
import ConfirmPost from 'components/Modal/ConfirmPost'
import AddPictureLinks from 'components/Pictures/AddPictureLinks'
import { sanitizeImgURLs } from 'lib/validator/sanitize'
import { idGenerator } from 'lib/id'

const generateId = idGenerator()

const NewDog: NextPage = () => {
  // Set defaults for the `select`s
  const [values, setValues] = useState<Record<string, string>>(() => ({
    breed: Breeds.LABRADOR,
    gender: 'f',
  }))

  const [pictureURLs, setPictureURLs] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string> | null>(null)
  const [result, setResult] = useState({ message: '', isError: false })
  const [open, setOpen] = useState(false)
  const [dog, setDog] = useState<Partial<Dog>>({})
  const router = useRouter()

  const status = router.query.estado

  const onConfirm = async () => {
    try {
      const { id } = await http<{ id: string }>({
        url: getFullURL('/api/dogs/new'),
        method: 'POST',
        data: dog,
      })

      setResult({
        message: `Reporte creado exitosamente (ID: ${id}), redirigiendo en 3s...`,
        isError: false,
      })

      setValues({})
      setTimeout(() => router.push(`/reportes/${id}`), 3_000)
    } catch (err) {
      console.error(err)
      setResult({ message: (err as Error).message, isError: true })
    } finally {
      setDog({})
      setPictureURLs({})
      setOpen(false)
    }
  }

  const onCancel = () => {
    setDog({})
    setOpen(false)
  }

  const handleNewDog = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setErrors(null)
    setResult({ message: '', isError: false })

    // Date siempre es hoy.
    const today = new Date()
    const y = today.getFullYear()
    const m = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1
    const d = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()
    const date = Number(`${y}${m}${d}`)

    const dog: Partial<Dog> = {
      status: status === 'encontrado' ? DogStatus.FOUND : DogStatus.LOST,
      name: status === 'encontrado' ? 'NN' : values.name?.trim(),
      date,
      color: [values.color?.trim().toLowerCase()],
      location: values.location?.trim(),
      description: values.description?.trim(),
      breed: values.breed?.toLowerCase() as Breeds,
      gender: values.gender === 'm' ? 'm' : 'f',
      contact: values.contact?.trim() || '',
      pictures: sanitizeImgURLs(pictureURLs),
    }

    const errs = validateDog(dog)
    if (errs) {
      setDog({})
      setErrors(errs)
      return
    }

    setDog(dog)
    setOpen(true)
  }

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }))
  }

  const addPictureInput = () => {
    setPictureURLs((prev) => ({ ...prev, [generateId()]: '' }))
  }

  const handlePictureChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setPictureURLs((prev) => ({
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

        <BreedSelect id="breed" value={values?.breed || ''} onChange={handleChange} />

        <GenderSelect id="gender" value={values?.gender || ''} onChange={handleChange} />

        <Input
          id="color"
          placeholder="Color"
          value={values?.color || ''}
          onChange={handleChange}
          error={errors?.color || ''}
        />

        <Input
          id="location"
          placeholder={`Lugar donde fue ${status}`}
          value={values?.location || ''}
          onChange={handleChange}
          error={errors?.location || ''}
        />

        <Input
          rows={5}
          id="description"
          placeholder="Descripción"
          value={values?.description || ''}
          onChange={handleChange}
          error={errors?.description || ''}
        />

        <Input
          id="contact"
          placeholder="Tus datos de contacto (opcional)"
          value={values?.contact || ''}
          onChange={handleChange}
          error={errors?.contact || ''}
        />

        <AddPictureLinks
          urls={pictureURLs}
          onChange={handlePictureChange}
          addPictureInput={addPictureInput}
          error={errors?.pictures || ''}
        />

        <Button type="submit" fullWidth>
          Guardar
        </Button>

        {result.message && (
          <Alert category={result.isError ? Categories.ERROR : Categories.SUCCESS}>
            {result.message}
          </Alert>
        )}
      </form>

      <ConfirmPost
        open={open}
        aria="confirmar reporte"
        onClose={onCancel}
        onConfirm={onConfirm}
        status={String(status)}
      />
    </main>
  )
}

export default NewDog
