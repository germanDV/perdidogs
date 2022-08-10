import { ChangeEvent } from 'react'
import styles from './Input.module.scss'

type Props = {
  id: string
  placeholder?: string
  type?: string
  value: string
  onChange: (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error: string
  rows?: number
}

const Input: React.FC<Props> = ({ id, placeholder, type, value, onChange, error, rows }) => {
  return (
    <div className={styles.container}>
      {rows ? (
        <textarea
          rows={rows}
          className={error ? styles.error : ''}
          id={id}
          name={id}
          placeholder={placeholder || ''}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className={error ? styles.error : ''}
          type={type || 'text'}
          id={id}
          name={id}
          placeholder={placeholder || ''}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <span>{error}</span>}
    </div>
  )
}

export default Input
