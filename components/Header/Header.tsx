import { useUser } from 'hooks/use-user'
import NavLink from 'components/NavLink/NavLink'
import Button from 'components/Button/Button'
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
          <>
            <NavLink to="/reportes" style={{ paddingTop: 6 }}>
              Mis Reportes
            </NavLink>
            <Button category="secondary" onClick={handleSignout}>
              Salir
            </Button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
