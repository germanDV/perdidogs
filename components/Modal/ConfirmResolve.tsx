import Modal, { Props as ModalProps } from './Modal'

type Props = Omit<ModalProps, 'children'>

const ConfirmResolve = ({ open, aria, onClose, onConfirm }: Props) => {
  return (
    <Modal open={open} aria={aria} onClose={onClose} onConfirm={onConfirm}>
      <h4>Confirmación</h4>
      <p>Confirmación de que el perro ya ha sido entregado.</p>
    </Modal>
  )
}

export default ConfirmResolve
