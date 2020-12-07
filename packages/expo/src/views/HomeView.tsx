import React, { useContext } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { ThemeContext } from 'react-native-elements'
import HomeCard from '../components/HomeCard'

export default function HomeView() {
  const { theme }: any = useContext(ThemeContext)
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.white,
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
      <HomeCard
        image={require('./img/polar.png')}
        title="Polar"
        description="Enron custodian email volume."
        link="PolarView"
      />
    </ScrollView>
  )
}
