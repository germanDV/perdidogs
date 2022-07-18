import Link from 'next/link'

type Props = {
  to: string
  label: string
}

const BackLink: React.FC<Props> = ({ to, label }) => (
  <Link href={to}>
    <a>&larr; {label}</a>
  </Link>
)

export default BackLink
