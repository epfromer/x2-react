import { selectDarkMode } from '@klonzo/common'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import HomeCard from '../components/HomeCard'

export default function HomeView() {
  const darkMode = useSelector(selectDarkMode)
  const styles = StyleSheet.create({
    container: {
      backgroundColor: darkMode ? '#222222' : 'white',
    },
  })

  return (
    <ScrollView style={styles.container}>
      <HomeCard
        image={require('./img/pie.png')}
        title="Pie"
        description="Pie chart of email volume of Enron key custodians."
        link="PieView"
      />
      <HomeCard
        image={require('./img/barchart.png')}
        title="Bar"
        description="Bar chart of email volume of Enron key custodians."
        link="BarView"
      />
      <HomeCard
        image={require('./img/volumetimeline.png')}
        title="Volume Timeline"
        description="XY timeline of Enron email per day with drill down."
        link="VolumeTimelineView"
      />
      <HomeCard
        image={require('./img/networkgraph.png')}
        title="Network Graph"
        description="Network graph of Enron key custodian communication."
        link="NetworkGraphView"
      />
      <HomeCard
        image={require('./img/treemap.png')}
        title="Tree Map"
        description="Tree map of email volume of Enron key custodians."
        link="TreeMapView"
      />
      <HomeCard
        image={require('./img/polar.png')}
        title="Polar"
        description="Polar chart of email volume of Enron key custodians."
        link="PolarView"
      />
    </ScrollView>
  )
}
