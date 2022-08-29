import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, FormEvent } from 'react'
import Title from 'components/Title/Title'
import UncontrolledInput from 'components/Input/UncontrolledInput'
import Button from 'components/Button/Button'
import A from 'components/A/A'
import { validateEmail, validatePass } from 'lib/validator/validator'
import { useUser } from 'hooks/use-user'

type FormTarget = { elements: Record<string, { value: string }> }

const SignIn: NextPage = () => {
  const [error, setError] = useState('')
  const router = useRouter()
  const { signin } = useUser()

  const handleSignin = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setError('')
    const form = ev.target as typeof ev.target & FormTarget
    const email = form.elements.email.value
    const pass = form.elements.pass.value

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

    try {
      await signin(email, pass)
      router.push('/')
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <main>
      <Title>Ingresar</Title>

      <p>
        No tengo cuenta, <A to="/registro">registrarme</A>
      </p>

      <form onSubmit={handleSignin} style={{ width: 350, margin: '40px 0' }}>
        <UncontrolledInput type="text" id="email" placeholder="Email" />
        <UncontrolledInput type="password" id="pass" placeholder="Contraseña" />
        <Button type="submit" fullWidth>
          Ingresar
        </Button>
        {error && <p style={{ color: 'tomato', textAlign: 'center' }}>Error: {error}</p>}
      </form>
    </main>
  )
}

export default SignIn
