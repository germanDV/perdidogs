import styles from './Spinner.module.scss'

type Props = {
  children: React.ReactNode
}

const Spinner: React.FC<Props> = ({ children }) => {
  return <div className={styles.spinner}>{children}</div>
}

export default Spinner
