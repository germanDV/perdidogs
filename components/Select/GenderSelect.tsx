import React, { ChangeEvent } from 'react'

type Props = {
  id: string
  value: string
  onChange: (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  allowEmpty?: boolean
  emptyLabel?: string
}

const GenderSelect = ({ id, value, onChange, allowEmpty, emptyLabel }: Props) => {
  return (
    <select
      name={id}
      id={id}
      value={value}
      onChange={onChange}
      style={{ textTransform: 'capitalize' }}
    >
      {allowEmpty && <option value="">{emptyLabel}</option>}
      <option value="f">Hembra</option>
      <option value="m">Macho</option>
    </select>
  )
}

export default GenderSelect
