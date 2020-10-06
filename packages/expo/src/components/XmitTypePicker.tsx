import { selectDarkMode } from '@klonzo/common'
import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { useSelector } from 'react-redux'
import getPickerStyles from '../common/pickerStyles'

interface Props {
  onChange: (value: string) => void
}
export default function ChartPicker({ onChange }: Props) {
  const darkMode = useSelector(selectDarkMode)
  const pickerStyles = getPickerStyles(darkMode)
  const [isSenders, setIsSenders] = useState(true)

  return (
    <RNPickerSelect
      value={isSenders ? 'Senders' : 'Receivers'}
      touchableWrapperProps={{ testID: 'xmit-picker' }}
      style={pickerStyles}
      useNativeAndroidPickerStyle={false}
      placeholder={{}}
      onValueChange={(v) => {
        setIsSenders(v === 'Senders')
        onChange(v)
      }}
      items={[
        { label: 'Senders', value: 'Senders' },
        { label: 'Receivers', value: 'Receivers' },
      ]}
    />
  )
}
