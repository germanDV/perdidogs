import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from './NavProgress.module.scss'

const NavProgress: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleEnd = () => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleEnd)
    router.events.on('routeChangeError', handleEnd)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleEnd)
      router.events.off('routeChangeError', handleEnd)
    }
  }, [router.events])

  if (!loading) return null

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <div className={styles.bar}></div>
      </div>
    </div>
  )
}

export default NavProgress
