import { selectThemeName, setThemeNameAsync } from '@klonzo/common'
import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, ThemeContext } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { appThemes, AppTheme } from '../utils/appThemes'

export default function ThemePicker() {
  const { theme }: any = useContext(ThemeContext)
  const themeName = useSelector(selectThemeName)

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

  const renderTheme = (t: AppTheme) => (
    <View style={styles.themeContainer} key={t.name}>
      <View style={styles.itemRow}>
        <View>
          <Text style={styles.text}>{t.name}</Text>
        </View>
        <View>
          <Button
            buttonStyle={getButtonStyle(t)}
            onPress={() => setThemeNameAsync(t.name)}
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
