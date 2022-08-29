import Link from 'next/link'
import styles from './A.module.scss'

type Props = {
  children: React.ReactNode
  to: string
}

const A: React.FC<Props> = ({ to, children }) => {
  return (
    <Link href={to}>
      <a className={styles.link}>{children}</a>
    </Link>
  )
}

export default A
