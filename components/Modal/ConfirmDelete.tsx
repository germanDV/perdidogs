import Modal, { Props as ModalProps } from './Modal'

type Props = Omit<ModalProps, 'children'>

const ConfirmDelete = ({ open, aria, onClose, onConfirm, loading }: Props) => {
  return (
    <Modal open={open} aria={aria} onClose={onClose} onConfirm={onConfirm} loading={loading}>
      <h4>Eliminar</h4>
      <p>¿Seguro que deseas eliminar este reporte? Se eliminará permanentemente.</p>
    </Modal>
  )
}

export default ConfirmDelete
