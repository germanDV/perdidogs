import React from 'react'
import ReachAlert from '@reach/alert'
import styles from './Alert.module.scss'

type Props = {
  category: 'error' | 'success'
  children: React.ReactNode
  onClose?: () => void
}

const MyAlert = ({ category, children, onClose }: Props) => {
  return (
    <ReachAlert
      type={category === 'error' ? 'assertive' : 'polite'}
      className={`${styles.base} ${category === 'error' ? styles.error : styles.success}`}
    >
      <span>{children}</span>
      {onClose && (
        <span className={styles.x} onClick={onClose}>
          X
        </span>
      )}
    </ReachAlert>
  )
}

export default MyAlert
