import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, FormEvent } from 'react'
import Title from 'components/Title/Title'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import http from 'lib/http/http'
import { validateName, validateEmail, validatePass } from 'lib/validator/validator'

type FormTarget = { elements: Record<string, { value: string }> }

const SignUp: NextPage = () => {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignup = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setError('')
    const form = ev.target as typeof ev.target & FormTarget
    const name = form.elements.name.value
    const email = form.elements.email.value
    const pass = form.elements.pass.value

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

    try {
      await http<{ token: string }>({
        url: '/api/user/signup',
        method: 'POST',
        data: { name, email, pass },
      })
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
        <Input type="text" id="name" placeholder="Nombre" />
        <Input type="text" id="email" placeholder="Email" />
        <Input type="password" id="pass" placeholder="Password" />
        <Button type="submit" fullWidth>
          Registrar
        </Button>
        {error && <p style={{ color: 'tomato', textAlign: 'center' }}>Error: {error}</p>}
      </form>
    </main>
  )
}

export default SignUp
