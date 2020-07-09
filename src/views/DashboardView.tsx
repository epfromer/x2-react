import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'


export default function DashboardView() {
  return <Text style={styles.header}>Dashboard</Text>
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },
})
