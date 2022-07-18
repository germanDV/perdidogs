import type { NextPage } from 'next'
import Link from 'next/link'
import styles from 'styles/Home.module.scss'
import Title from 'components/Title/Title'
import Subtitle from 'components/Subtitle/Subtitle'

const Home: NextPage = () => {
  return (
    <main>
      <Title>PerdiDogs</Title>
      <Subtitle>Buscador de perr@s perdid@s</Subtitle>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Buscados</h2>
          <Link href="/buscados">
            <a>
              Ver <strong>listado</strong> de perr@s perdid@s&nbsp;&rarr;
            </a>
          </Link>
          <Link href="/nuevo?estado=perdido">
            <a>
              <strong>Reportar</strong> perr@ perdid@&nbsp;&rarr;
            </a>
          </Link>
        </div>

        <div className={styles.card}>
          <h2>Encontrados</h2>
          <Link href="/encontrados">
            <a>
              Ver <strong>listado</strong> de perr@s encontrad@s&nbsp;&rarr;
            </a>
          </Link>
          <Link href="/nuevo?estado=encontrado">
            <a>
              <strong>Reportar</strong> perr@ encontrad@&nbsp;&rarr;
            </a>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Home
