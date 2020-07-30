import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../store/types'

export default function ContactSettings() {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const styles = StyleSheet.create({
    title: {
      fontSize: 15,
      paddingTop: 5,
      paddingLeft: 15,
      color: darkMode ? 'white' : 'black',
    },
  })

  function handleColorChosen(color: string) {
    console.log(color)
  }

  return (
    <>
      <Text style={styles.title}>text</Text>
      <Text style={styles.title}>text</Text>
      <Text style={styles.title}>text</Text>
      <Text style={styles.title}>text</Text>
      <Text style={styles.title}>text</Text>
      <Text style={styles.title}>text</Text>
      <Text style={styles.title}>text</Text>
      <Text style={styles.title}>text</Text>
      <Text style={styles.title}>text</Text>
    </>
  )
}
