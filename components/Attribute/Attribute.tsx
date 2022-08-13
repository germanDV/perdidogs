import styles from './Attribute.module.scss'

const Attribute = ({ label, value }: { label: string; value: string }) => {
  return (
    <section className={styles.container}>
      <div className={styles.label}>{label}</div>
      <div>{value}</div>
    </section>
  )
}

export default Attribute
