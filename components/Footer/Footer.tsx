import styles from './Footer.module.scss'

const Footer = () => (
  <footer className={styles.footer}>
    <p>&copy; {new Date().getFullYear()} Derechos reservados.</p>
  </footer>
)

export default Footer
