import Image from 'next/image'

type Props = {
  pictures: string[] | undefined
}

const Pictures = ({ pictures }: Props) => {
  if (!pictures || pictures.length === 0) {
    return null
  }

  return (
    <Image src={pictures[0]} alt="Foto" width="500" height="400" layout="responsive" priority />
  )
}

export default Pictures
