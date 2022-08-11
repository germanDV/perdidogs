import React, { ChangeEvent } from 'react'
import { Breeds } from 'lib/models/dog-schema'

type Props = {
  id: string
  value: string
  onChange: (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

const BreedSelect = ({ id, value, onChange }: Props) => {
  return (
    <select
      name={id}
      id={id}
      value={value}
      onChange={onChange}
      style={{ textTransform: 'capitalize' }}
    >
      {Object.values(Breeds).map((b) => (
        <option key={b} value={b}>
          {b}
        </option>
      ))}
    </select>
  )
}

export default BreedSelect
