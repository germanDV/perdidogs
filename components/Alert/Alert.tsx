import React from 'react'
import ReachAlert from '@reach/alert'
import styles from './Alert.module.scss'

export enum Categories {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}

type Props = {
  category: Categories
  children: React.ReactNode
  onClose?: () => void
}

const categoryTypes: Record<Categories, 'assertive' | 'polite'> = {
  [Categories.ERROR]: 'assertive',
  [Categories.WARNING]: 'polite',
  [Categories.SUCCESS]: 'polite',
}

const categoryClasses = {
  [Categories.ERROR]: styles.error,
  [Categories.WARNING]: styles.warning,
  [Categories.SUCCESS]: styles.success,
}

const MyAlert = ({ category, children, onClose }: Props) => {
  return (
    <ReachAlert
      type={categoryTypes[category]}
      className={`${styles.base} ${categoryClasses[category]}`}
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
