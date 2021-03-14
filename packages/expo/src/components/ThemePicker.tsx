import { setThemeNameAsync, store } from '@klonzo/common'
import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, ThemeContext } from 'react-native-elements'
import { AppTheme, appThemes, getTheme } from '../utils/appThemes'

export default function ThemePicker() {
  const { theme, replaceTheme }: any = useContext(ThemeContext)

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.white },
    themeContainer: { marginTop: 10 },
    text: { marginTop: 5, color: theme.colors.black },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 10,
      marginRight: 10,
    },
  })

  const getButtonStyle = (t: AppTheme) => ({
    backgroundColor: t.Header.containerStyle.backgroundColor,
    width: 100,
    height: 30,
  })

  const setTheme = (themeName: string) => {
    setThemeNameAsync(store, themeName)
    replaceTheme(getTheme(themeName))
  }

  const renderTheme = (t: AppTheme) => (
    <View style={styles.themeContainer} key={t.name}>
      <View style={styles.itemRow}>
        <View>
          <Text style={styles.text}>{t.name}</Text>
        </View>
        <View>
          <Button
            buttonStyle={getButtonStyle(t)}
            onPress={() => setTheme(t.name)}
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
