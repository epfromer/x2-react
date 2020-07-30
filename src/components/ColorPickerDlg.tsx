import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import PrimaryColorPicker from './PrimaryColorPicker'

interface Props {
  open: boolean
  defaultColor: string
  onClose: (c: string) => void
}
export default function ColorPickerDlg({ open, defaultColor, onClose }: Props) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  })
  const [pickedColor, setPickedColor] = useState('')

  return (
    // <PrimaryColorPicker defaultColor={defaultColor}
    //   onColorSelected={(color: string) =>
    //     console.log(`Color selected: ${color}`)
    //   }
    //   style={styles.container}
    // />
    <></>
  )
}
