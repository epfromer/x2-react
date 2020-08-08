import Slider from '@react-native-community/slider'
import { RootState } from '@x2react/shared'
import React from 'react'
import { StyleSheet } from 'react-native'
import { ColorPicker } from 'react-native-color-picker'
import { Button } from 'react-native-elements'
import Modal from 'react-native-modal'
import { useSelector } from 'react-redux'

interface Props {
  open: boolean
  defaultColor: string
  onClose: (c: string) => void
  onCancel: () => void
}
export default function ColorPickerDlg({
  open,
  defaultColor,
  onClose,
  onCancel,
}: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    button: {
      marginTop: 30,
      height: 50,
    },
  })

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
      <Button
        buttonStyle={styles.button}
        onPress={() => onCancel()}
        title="Cancel"
      />
    </Modal>
  )
}
