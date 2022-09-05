/* eslint-disable @next/next/no-html-link-for-pages */
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
          <a href="/nuevo?estado=perdido">
            <strong>Reportar</strong> perr@ perdid@&nbsp;&rarr;
          </a>
        </div>

        <div className={styles.card}>
          <h2>Encontrados</h2>
          <Link href="/encontrados">
            <a>
              Ver <strong>listado</strong> de perr@s encontrad@s&nbsp;&rarr;
            </a>
          </Link>
          <a href="/nuevo?estado=encontrado">
            <strong>Reportar</strong> perr@ encontrad@&nbsp;&rarr;
          </a>
        </div>
      </div>
    </main>
  )
}

export default Home
