import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, FormEvent } from 'react'
import Title from 'components/Title/Title'
import UncontrolledInput from 'components/Input/UncontrolledInput'
import Button from 'components/Button/Button'
import Alert, { Categories } from 'components/Alert/Alert'
import { validatePass } from 'lib/validator/validator'
import http, { getFullURL } from 'lib/http/http'

type FormTarget = { elements: Record<string, { value: string }> }

const ChangePassword: NextPage = () => {
  const [result, setResult] = useState({ message: '', isError: false })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePasswordChange = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setResult({ message: '', isError: false })
    const form = ev.target as typeof ev.target & FormTarget
    const oldPass = form.elements.oldPass.value
    const newPass = form.elements.newPass.value
    const repeatPass = form.elements.repeatPass.value

    const [isValidOldPass, oldPassError] = validatePass(oldPass)
    if (!isValidOldPass) {
      setResult({ message: oldPassError, isError: true })
      return
    }

    const [isValidNewPass, newPassError] = validatePass(newPass)
    if (!isValidNewPass) {
      setResult({ message: newPassError, isError: true })
      return
    }

    if (newPass !== repeatPass) {
      setResult({ message: 'Las contraseñas no coinciden.', isError: true })
      return
    }

    setLoading(true)
    try {
      await http({
        url: getFullURL('/api/user/changepass'),
        method: 'POST',
        data: { oldPass, newPass },
      })

      setResult({
        message: 'Tu contraseña se ha cambiado con éxito, redirigiendo en 3s...',
        isError: false,
      })

      setTimeout(() => router.push('/'), 3_000)
    } catch (err) {
      setResult({ message: (err as Error).message, isError: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <Title>Cambiar Contraseña</Title>

      <form onSubmit={handlePasswordChange} style={{ width: 350, margin: '40px 0' }}>
        <UncontrolledInput type="password" id="oldPass" placeholder="Contraseña Actual" />
        <UncontrolledInput type="password" id="newPass" placeholder="Contraseña Nueva" />
        <UncontrolledInput type="password" id="repeatPass" placeholder="Repita Nueva Contraseña" />
        <Button type="submit" fullWidth loading={loading}>
          Cambiar Contraseña
        </Button>

        {result.message && (
          <Alert category={result.isError ? Categories.ERROR : Categories.SUCCESS}>
            {result.message}
          </Alert>
        )}
      </form>
    </main>
  )
}

export default ChangePassword
