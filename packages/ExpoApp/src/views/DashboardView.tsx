import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import AppHeader from '../components/AppHeader'
// import DashboardCard from '../components/DashboardCard'
// import {
//   BARCHART,
//   CHORD,
//   EVENTTIMELINE,
//   NETWORKGRAPH,
//   PIE,
//   POLAR,
//   SEARCH,
//   TREEMAP,
//   VOLUMETIMELINE,
//   WORDCLOUD,
// } from '../image/index'

interface Props {
  navigation: any
}
export default function DashboardView({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>dashboard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
