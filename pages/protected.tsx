import type { NextPage } from 'next'
import Title from 'components/Title/Title'
import Subtitle from 'components/Subtitle/Subtitle'

const Protected: NextPage = () => {
  return (
    <main>
      <Title>Protected</Title>
      <Subtitle>Esta página solo es visible con autenticación</Subtitle>
    </main>
  )
}

export default Protected
