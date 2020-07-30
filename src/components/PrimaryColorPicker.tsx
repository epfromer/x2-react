import React from 'react'
import { StyleSheet } from 'react-native'
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import Slider from '@react-native-community/slider'

// https://www.npmjs.com/package/react-native-color-picker

interface Props {
  defaultColor: string
  onChange: (c: string) => void
}
export default function PrimaryColorPicker({ defaultColor, onChange }: Props) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  })

  return (
    <ColorPicker
      onColorChange={(color: any) => onChange(fromHsv(color))}
      onColorSelected={(color: string) => onChange(color)}
      defaultColor={defaultColor}
      style={styles.container}
      sliderComponent={Slider as any}
    />
  )
}
