import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ColorPicker } from 'react-native-color-picker'
import { useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import { RootState } from '../store/types'

export default function AppSettingsView() {
  const darkMode = useSelector((state: RootState) => state.darkMode)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    picker: {
      height: 200,
    },
    title: {
      fontSize: 15,
      paddingTop: 5,
      paddingLeft: 15,
      color: darkMode ? 'white' : 'black',
    },
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

  const PrimaryColorPicker = () => (
    <ColorPicker
      onColorSelected={(color) => console.log(`Color selected: ${color}`)}
      style={styles.container}
    />
  )

  return (
    <>
      <AppHeader title="Settings" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Primary Interface Color</Text>
          <View style={styles.picker}>
            <PrimaryColorPicker />
          </View>
          <Text style={styles.title}>Secondary Interface Color</Text>
          <View style={styles.picker}>
            <PrimaryColorPicker />
          </View>
          <Text style={styles.title}>text</Text>
          <Text style={styles.title}>text</Text>
          <Text style={styles.title}>text</Text>
          <Text style={styles.title}>text</Text>
          <Text style={styles.title}>text</Text>
          <Text style={styles.title}>text</Text>
          <Text style={styles.title}>text</Text>
          <Text style={styles.title}>text</Text>
          <Text style={styles.title}>text</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
