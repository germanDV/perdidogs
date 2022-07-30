import styles from './Button.module.scss'

type Props = {
  children: React.ReactNode
  category?: 'primary' | 'secondary'
  type?: 'submit' | 'button'
  onClick?: () => void
  fullWidth?: boolean
}

const Button: React.FC<Props> = ({ children, category, type, fullWidth, onClick }) => {
  const getClasses = (): string => {
    let classes = `${styles.button}`

    const cat = category === 'secondary' ? `${styles.secondary}` : `${styles.primary}`
    classes += ` ${cat}`

    if (fullWidth) {
      classes += ` ${styles.full}`
    }

    return classes
  }

  return (
    <button
      type={type || 'button'}
      onClick={type !== 'submit' ? onClick : undefined}
      className={getClasses()}
    >
      {children}
    </button>
  )
}

export default Button
