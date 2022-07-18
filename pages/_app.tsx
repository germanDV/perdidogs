import type { AppProps } from 'next/app'
import 'styles/globals.scss'
import Head from 'components/Head/Head'
import Footer from 'components/Footer/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
