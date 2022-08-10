import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, FormEvent } from 'react'
import Title from 'components/Title/Title'
import UncontrolledInput from 'components/Input/UncontrolledInput'
import Button from 'components/Button/Button'
import { validateName, validateEmail, validatePass } from 'lib/validator/validator'
import { useUser } from 'hooks/use-user'

type FormTarget = { elements: Record<string, { value: string }> }

const SignUp: NextPage = () => {
  const [error, setError] = useState('')
  const router = useRouter()
  const { signup } = useUser()

  const handleSignup = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setError('')
    const form = ev.target as typeof ev.target & FormTarget
    const name = form.elements.name.value
    const email = form.elements.email.value
    const pass = form.elements.pass.value
    const repeat = form.elements.repeat.value

    const [isValidName, nameError] = validateName(name)
    if (!isValidName) {
      setError(nameError)
      return
    }

    const [isValidEmail, emailError] = validateEmail(email)
    if (!isValidEmail) {
      setError(emailError)
      return
    }

    const [isValidPass, passError] = validatePass(pass)
    if (!isValidPass) {
      setError(passError)
      return
    }

    if (pass !== repeat) {
      setError('Las contraseñas no coinciden.')
      return
    }

    try {
      await signup(name, email, pass)
      router.push('/')
    } catch (err) {
      console.error(err)
      setError((err as Error).message)
    }
  }

  return (
    <main>
      <Title>Crear Cuenta</Title>

      <form onSubmit={handleSignup} style={{ width: 350, margin: '40px 0' }}>
        <UncontrolledInput type="text" id="name" placeholder="Nombre" />
        <UncontrolledInput type="text" id="email" placeholder="Email" />
        <UncontrolledInput type="password" id="pass" placeholder="Contraseña" />
        <UncontrolledInput type="password" id="repeat" placeholder="Repetir contraseña" />
        <Button type="submit" fullWidth>
          Registrarme
        </Button>
        {error && <p style={{ color: 'tomato', textAlign: 'center' }}>Error: {error}</p>}
      </form>
    </main>
  )
}

export default SignUp
