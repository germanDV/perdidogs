import { useRouter } from 'next/router'
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button'
import UserIcon from 'icons/UserIcon'
import DocumentIcon from 'icons/DocumentIcon'
import SignoutIcon from 'icons/SignoutIcon'
import LockIcon from 'icons/LockIcon'
import '@reach/menu-button/styles.css'
import styles from './UserMenu.module.scss'

type Props = {
  onSignout: () => void
}

const UserMenu: React.FC<Props> = ({ onSignout }) => {
  const router = useRouter()

  return (
    <Menu>
      <MenuButton className={styles.btn}>
        <UserIcon />
      </MenuButton>
      <MenuList className={styles.list}>
        <MenuItem onSelect={() => router.push('/reportes')}>
          <DocumentIcon />
          <span className={styles.label}>Mis Reportes</span>
        </MenuItem>
        <MenuItem onSelect={() => router.push('/password')}>
          <LockIcon />
          <span className={styles.label}>Contraseña</span>
        </MenuItem>
        <MenuItem onSelect={onSignout}>
          <SignoutIcon />
          <span className={styles.label}>Salir</span>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserMenu
