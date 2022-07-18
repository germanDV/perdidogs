import styles from './Subtitle.module.scss'

type Props = {
  children: React.ReactNode
}

const Subtitle: React.FC<Props> = ({ children }) => <p className={styles.subtitle}>{children}</p>

export default Subtitle
