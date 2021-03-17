import { blackBackground, getDarkMode } from '@klonzo/common'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import HomeCard from '../components/HomeCard'

export default function HomeView() {
  const darkMode = useSelector(getDarkMode)
  const styles = StyleSheet.create({
    container: {
      backgroundColor: darkMode ? blackBackground : 'white',
    },
  })

  return (
    <ScrollView style={styles.container}>
      <HomeCard
        image={require('./img/pie.png')}
        title="Pie"
        description="Enron custodian email volume."
        link="PieView"
      />
      <HomeCard
        image={require('./img/barchart.png')}
        title="Bar"
        description="Enron custodian email volume."
        link="BarView"
      />
      <HomeCard
        image={require('./img/volumetimeline.png')}
        title="Volume Timeline"
        description="Enron email per day."
        link="VolumeTimelineView"
      />
      <HomeCard
        image={require('./img/networkgraph.png')}
        title="Network Graph"
        description="Enron custodian communication."
        link="NetworkGraphView"
      />
      <HomeCard
        image={require('./img/treemap.png')}
        title="Tree Map"
        description="Enron custodian email volume."
        link="TreeMapView"
      />
    </ScrollView>
  )
}
