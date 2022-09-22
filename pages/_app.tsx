import type { AppProps } from 'next/app'
import 'styles/globals.scss'
import Head from 'components/Head/Head'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import NavProgress from 'components/NavProgress/NavProgress'
import { UserProvider } from 'hooks/use-user'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <UserProvider>
        <NavProgress />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </UserProvider>
    </>
  )
}

export default MyApp
