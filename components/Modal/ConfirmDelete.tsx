import Modal, { Props as ModalProps } from './Modal'

type Props = Omit<ModalProps, 'children'>

const ConfirmDelete = ({ open, aria, onClose, onConfirm }: Props) => {
  return (
    <Modal open={open} aria={aria} onClose={onClose} onConfirm={onConfirm}>
      <h4>Confirmación</h4>
      <p>Confirmación de que desea eliminar este reporte.</p>
    </Modal>
  )
}

export default ConfirmDelete
