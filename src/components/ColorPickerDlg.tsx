import Slider from '@react-native-community/slider'
import React from 'react'
import { StyleSheet } from 'react-native'
import { ColorPicker } from 'react-native-color-picker'
import Modal from 'react-native-modal'
import { useSelector } from 'react-redux'
import { RootState } from '../store/types'

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
  const darkMode = useSelector((state: RootState) => state.darkMode)

  return (
    <Modal
      isVisible={open}
      backdropOpacity={0.95}
      backdropColor={darkMode ? 'black' : 'white'}
      supportedOrientations={['portrait', 'landscape']}
    >
      {/* 
  // @ts-ignore */}
      <ColorPicker
        onColorSelected={(color: string) => onClose(color)}
        defaultColor={defaultColor}
        style={styles.container}
        sliderComponent={Slider as any}
      />
    </Modal>
  )
}
