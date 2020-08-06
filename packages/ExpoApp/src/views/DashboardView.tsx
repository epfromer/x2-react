import React from 'react'
import { StyleSheet, Button, View } from 'react-native'
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
      <Button onPress={() => navigation.goBack()} title="DashboardView" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
