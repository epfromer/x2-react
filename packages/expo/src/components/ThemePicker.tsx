import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, ThemeContext, Icon } from 'react-native-elements'
import { appThemes } from '../common/appThemes'

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

  const renderTheme = (t) => (
    <View style={styles.themeContainer} key={t.name}>
      <View style={styles.itemRow}>
        <View>
          <Text style={styles.text}>{t.name}</Text>
        </View>
        <View>
          <Button
            icon={<Icon name="check" size={15} color="white" />}
            buttonStyle={
              {
                backgroundColor: t.Header.containerStyle.backgroundColor,
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
      {appThemes?.map((t) => renderTheme(t))}
    </View>
  )
}
