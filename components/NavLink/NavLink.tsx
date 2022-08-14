import Link from 'next/link'
import styles from './NavLink.module.scss'

type Props = {
  children: React.ReactNode
  to: string
  style?: Record<string, string | number>
}

const ButtonLink: React.FC<Props> = ({ to, children, style }) => {
  return (
    <Link href={to}>
      <a className={styles.link} style={style || {}}>
        {children}
      </a>
    </Link>
  )
}

export default ButtonLink
