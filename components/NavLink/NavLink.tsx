import Link from 'next/link'
import styles from './NavLink.module.scss'

type Props = {
  children: React.ReactNode
  to: string
}

const ButtonLink: React.FC<Props> = ({ to, children }) => {
  return (
    <Link href={to}>
      <a className={styles.link}>{children}</a>
    </Link>
  )
}

export default ButtonLink
