import { ReactNode } from 'react'
import { Dialog } from '@reach/dialog'
import '@reach/dialog/styles.css'
import Button from '../Button/Button'
import styles from './Modal.module.scss'

export type Props = {
  open: boolean
  aria: string
  onConfirm?: () => void
  onClose: () => void
  children: ReactNode
  loading?: boolean
}

const Modal = ({ open, aria, onClose, onConfirm, children, loading }: Props) => {
  return (
    <Dialog isOpen={open} onDismiss={onClose} aria-label={aria} className={styles.container}>
      {children}

      <div className={styles.btn}>
        <Button category="secondary" onClick={onClose}>
          Cerrar
        </Button>
        {onConfirm && (
          <Button category="primary" onClick={onConfirm} loading={loading}>
            Confirmar
          </Button>
        )}
      </div>
    </Dialog>
  )
}

export default Modal
