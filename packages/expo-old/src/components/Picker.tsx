import { getDarkMode } from '@klonzo/common'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { useSelector } from 'react-redux'

interface Props {
  selections: string[]
  onChange: (value: string) => void
}
export default function Picker({ selections, onChange }: Props) {
  const darkMode = useSelector(getDarkMode)
  const [selected, setSelected] = useState(selections[0])

  const styles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 4,
      color: darkMode ? 'white' : 'black',
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 8,
      color: darkMode ? 'white' : 'black',
    },
  })

  return (
    <RNPickerSelect
      value={selected}
      touchableWrapperProps={{ testID: 'picker' }}
      style={styles}
      useNativeAndroidPickerStyle={false}
      placeholder={{}}
      onValueChange={(v) => {
        setSelected(v)
        onChange(v)
      }}
      items={selections.map((s) => ({ label: s, value: s }))}
    />
  )
}
