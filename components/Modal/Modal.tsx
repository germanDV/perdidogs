import { ReactElement } from 'react'
import { Dialog } from '@reach/dialog'
import Button from '../Button/Button'
import '@reach/dialog/styles.css'
import styles from './Modal.module.scss'

type Props = {
  open: boolean
  aria: string
  onClose: () => void
  title: string
  children: ReactElement
}

const Modal = ({ open, aria, onClose, title, children }: Props) => {
  return (
    <Dialog isOpen={open} onDismiss={onClose} aria-label={aria}>
      <h4 className={styles.title}>{title}</h4>
      {children}
      <Button category="secondary" onClick={onClose}>
        Close
      </Button>
    </Dialog>
  )
}

export default Modal
