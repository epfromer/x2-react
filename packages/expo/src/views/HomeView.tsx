import React from 'react'
import { ScrollView } from 'react-native'
import HomeCard from '../components/HomeCard'

interface Props {
  navigation: any
}
export default function HomeView({ navigation }: Props) {
  return (
    <ScrollView>
      <HomeCard
        navigation={navigation}
        image={require('./img/pie.png')}
        title="Pie"
        description="Pie chart of email volume of Enron key custodians."
        link="PieView"
      />
      <HomeCard
        navigation={navigation}
        image={require('./img/barchart.png')}
        title="Bar"
        description="Bar chart of email volume of Enron key custodians."
        link="BarView"
      />
      <HomeCard
        navigation={navigation}
        image={require('./img/volumetimeline.png')}
        title="Volume Timeline"
        description="XY timeline of Enron email per day with drill down."
        link="VolumeTimelineView"
      />
      <HomeCard
        navigation={navigation}
        image={require('./img/networkgraph.png')}
        title="Network Graph"
        description="Network graph of Enron key custodian communication."
        link="NetworkGraphView"
      />
      <HomeCard
        navigation={navigation}
        image={require('./img/treemap.png')}
        title="Tree Map"
        description="Tree map of email volume of Enron key custodians."
        link="TreeMapView"
      />
      <HomeCard
        navigation={navigation}
        image={require('./img/polar.png')}
        title="Polar"
        description="Polar chart of email volume of Enron key custodians."
        link="PolarView"
      />
    </ScrollView>
  )
}
