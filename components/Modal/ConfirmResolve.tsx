import Modal, { Props as ModalProps } from './Modal'

type Props = Omit<ModalProps, 'children'>

const ConfirmResolve = ({ open, aria, onClose, onConfirm, loading }: Props) => {
  return (
    <Modal open={open} aria={aria} onClose={onClose} onConfirm={onConfirm} loading={loading}>
      <h4>Confirmación</h4>
      <p>
        ¿Deseas marcar este reporte como resuelto? Esto significa que el perro ha sido entregado a
        su familia.
      </p>
    </Modal>
  )
}

export default ConfirmResolve
