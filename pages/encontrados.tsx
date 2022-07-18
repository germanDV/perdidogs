import type { NextPage } from 'next'
import BackLink from 'components/BackLink/BackLink'
import Title from 'components/Title/Title'
import Subtitle from 'components/Subtitle/Subtitle'

const Encontrados: NextPage = () => {
  return (
    <main>
      <BackLink to="/" label="Inicio" />
      <Title>Encontrad@s</Title>
      <Subtitle>Perr@s buscando a su dueñ@</Subtitle>
    </main>
  )
}

export default Encontrados
