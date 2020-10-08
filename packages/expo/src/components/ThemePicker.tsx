import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, ThemeContext, Icon } from 'react-native-elements'

export default function ThemePicker() {
  const { theme }: any = useContext(ThemeContext)
  const themes = ['red', 'blue', 'orange']

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    themeContainer: {
      marginTop: 10,
    },
    text: {
      marginTop: 5,
      color: theme.colors.black,
    },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 10,
      marginRight: 10,
    },
  })

  const renderTheme = (themeName) => (
    <View style={styles.themeContainer} key={themeName}>
      <View style={styles.itemRow}>
        <View>
          <Text style={styles.text}>{themeName}</Text>
        </View>
        <View>
          <Button
            icon={<Icon name="check" size={15} color="white" />}
            buttonStyle={
              {
                backgroundColor: themeName,
                width: 100,
              } as any
            }
            // onPress={() => {
            //   setCustodianId(custodian.id)
            //   setPickedColor(custodian.color)
            //   setColorPickerDlgOpen(true)
            // }}
          />
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {themes?.map((custodian) => renderTheme(custodian))}
    </View>
  )
}
