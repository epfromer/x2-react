import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Card } from 'react-native-elements'

export default function DashboardView() {
  return (
    <Card title="HELLO WORLD">
      <Text>
        The idea with React Native Elements is more about component structure
        than actual design.
      </Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },
})
