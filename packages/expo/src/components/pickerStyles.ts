import { StyleSheet } from 'react-native'

export function getPickerStyles(
  textColor: string,
  backgroundColor: string,
  borderColor: string
) {
  return StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor,
      borderRadius: 4,
      backgroundColor,
      color: textColor,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor,
      borderRadius: 8,
      color: textColor,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  })
}
