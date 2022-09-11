import { useUser } from 'hooks/use-user'
import NavLink from 'components/NavLink/NavLink'
import UserMenu from 'components/UserMenu/UserMenu'
import styles from './Header.module.scss'

const Header = () => {
  const { user, signout } = useUser()

  const handleSignout = () => {
    try {
      signout()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <header>
      <nav className={styles.nav}>
        {!user ? (
          <>
            <NavLink to="/registro">Registrarme</NavLink>
            <NavLink to="/ingresar">Ingresar</NavLink>
          </>
        ) : (
          <UserMenu onSignout={handleSignout} />
        )}
      </nav>
    </header>
  )
}

export default Header
