import styles from './Title.module.scss'

type Props = {
  children: React.ReactNode
}

const Title: React.FC<Props> = ({ children }) => <h1 className={styles.title}>{children}</h1>

export default Title
