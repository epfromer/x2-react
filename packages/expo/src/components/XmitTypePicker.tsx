import React from 'react'
import Picker from './Picker'

interface Props {
  onChange: (value: string) => void
}
export default function XmitTypePicker({ onChange }: Props) {
  return <Picker selections={['Senders', 'Receivers']} onChange={onChange} />
}
