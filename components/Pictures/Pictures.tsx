import Image from 'next/image'
import { useState } from 'react'
import styles from './Pictures.module.scss'

type Props = {
  pictures: string[] | undefined
}

const Pictures = ({ pictures }: Props) => {
  const [selected, setSelected] = useState(() => {
    if (pictures && pictures.length > 0) {
      return pictures[0]
    }
    return ''
  })

  if (!pictures || pictures.length === 0) {
    return null
  }

  return (
    <div className={styles.container}>
      <Image src={selected} alt="Foto" width="500" height="400" layout="responsive" priority />

      {pictures.length > 1 && (
        <div className={styles.stripe}>
          {pictures.map((p) => (
            <div key={p} onClick={() => setSelected(p)}>
              <Image src={p} alt="Foto" width="50" height="40" layout="responsive" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Pictures
