import React, { ChangeEvent } from 'react'
import { Breeds } from 'lib/models/dog-schema'

type Props = {
  id: string
  value: string
  onChange: (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  allowEmpty?: boolean
  emptyLabel?: string
}

const BreedSelect = ({ id, value, onChange, allowEmpty, emptyLabel }: Props) => {
  return (
    <select
      name={id}
      id={id}
      value={value}
      onChange={onChange}
      style={{ textTransform: 'capitalize' }}
    >
      {allowEmpty && <option value="">{emptyLabel}</option>}
      {Object.values(Breeds).map((b) => (
        <option key={b} value={b}>
          {b}
        </option>
      ))}
    </select>
  )
}

export default BreedSelect
