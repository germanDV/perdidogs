import Link from 'next/link'
import Modal, { Props as ModalProps } from './Modal'

type Props = Omit<ModalProps, 'children'> & {
  status: string
}

const ConfirmPost = ({ open, aria, onClose, onConfirm, status, loading }: Props) => {
  return (
    <Modal open={open} aria={aria} onClose={onClose} onConfirm={onConfirm} loading={loading}>
      <h4>Confirmación</h4>
      <p>
        Antes de crear este reporte, por favor verificá el listado de perros{' '}
        {status === 'perdido' ? 'encontrados' : 'perdidos'}.
      </p>

      {status === 'perdido' ? (
        <Link href="/encontrados">
          <a target="_blank" rel="noopener noreferer">
            perros encontrados&nbsp;&rarr;
          </a>
        </Link>
      ) : (
        <Link href="/buscados">
          <a target="_blank" rel="noopener noreferer">
            perros perdidos&nbsp;&rarr;
          </a>
        </Link>
      )}

      <p>Si no encontraste a tu perro en ese listado, dale click a CONFIRMAR para registrarlo.</p>
    </Modal>
  )
}

export default ConfirmPost
