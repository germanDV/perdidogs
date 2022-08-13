import React, { ChangeEvent } from 'react'

type Props = {
  id: string
  value: string
  onChange: (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

const GenderSelect = ({ id, value, onChange }: Props) => {
  return (
    <select
      name={id}
      id={id}
      value={value}
      onChange={onChange}
      style={{ textTransform: 'capitalize' }}
    >
      <option value="f">Hembra</option>
      <option value="m">Macho</option>
    </select>
  )
}

export default GenderSelect
