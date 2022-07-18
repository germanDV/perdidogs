import type { NextPage } from 'next'
import BackLink from 'components/BackLink/BackLink'
import Title from 'components/Title/Title'
import Subtitle from 'components/Subtitle/Subtitle'

const Buscados: NextPage = () => {
  return (
    <main>
      <BackLink to="/" label="Inicio" />
      <Title>Buscad@s</Title>
      <Subtitle>Dueñ@s buscando a su perr@</Subtitle>
    </main>
  )
}

export default Buscados
