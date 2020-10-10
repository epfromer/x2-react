import React, { useContext, useState } from 'react'
import { ThemeContext } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'
import { textColor } from './appThemes'
import { getPickerStyles } from './pickerStyles'

interface Props {
  onChange: (value: string) => void
}
export default function ChartPicker({ onChange }: Props) {
  const { theme }: any = useContext(ThemeContext)
  const pickerStyles = getPickerStyles(
    textColor(theme),
    theme.Button.buttonStyle.backgroundColor,
    theme.colors.gray
  )
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
