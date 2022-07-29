import styles from './Input.module.scss'

type Props = {
  id: string
  placeholder?: string
  type?: string
}

const Input: React.FC<Props> = ({ id, placeholder, type }) => {
  return (
    <input
      className={styles.input}
      type={type || 'text'}
      id={id}
      name={id}
      placeholder={placeholder || ''}
    />
  )
}

export default Input
