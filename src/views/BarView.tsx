import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function BarView() {
  return <Text style={styles.header}>BarView</Text>
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },
})
