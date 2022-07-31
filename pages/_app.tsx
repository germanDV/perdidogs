import type { AppProps } from 'next/app'
import 'styles/globals.scss'
import Head from 'components/Head/Head'
import Footer from 'components/Footer/Footer'
import { UserProvider } from 'hooks/use-user'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <Head />
        <Component {...pageProps} />
        <Footer />
      </UserProvider>
    </>
  )
}

export default MyApp
