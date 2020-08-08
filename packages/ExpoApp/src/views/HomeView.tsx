import {
  BARCHART,
  CHORD,
  EVENTTIMELINE,
  NETWORKGRAPH,
  PIE,
  POLAR,
  SEARCH,
  SETTINGS,
  TREEMAP,
  VOLUMETIMELINE,
  WORDCLOUD,
} from '@x2react/shared'
import React from 'react'
import { ScrollView, Text } from 'react-native'
import HomeCard from '../components/HomeCard'
import { sayHello } from '@x2react/common'

interface Props {
  navigation: any
}
export default function HomeView({ navigation }: Props) {
  return (
    <ScrollView>
      <Text>{sayHello()}</Text>
      <HomeCard
        navigation={navigation}
        image={PIE as any}
        title="Pie"
        description="Pie chart of email volume of Enron key contacts."
        link="PieView"
      />
      <HomeCard
        navigation={navigation}
        image={BARCHART as any}
        title="Bar"
        description="Bar chart of email volume of Enron key contacts."
        link="BarView"
      />
      <HomeCard
        navigation={navigation}
        image={CHORD as any}
        title="Chord"
        description="Chord diagram of Enron key contact communication."
        link="ChordView"
      />
      <HomeCard
        navigation={navigation}
        image={WORDCLOUD as any}
        title="Word Cloud"
        description="Word cloud of fraudulent project names."
        link="WordCloudView"
      />
      <HomeCard
        navigation={navigation}
        image={VOLUMETIMELINE as any}
        title="Volume Timeline"
        description="XY timeline of Enron email per day with drill down."
        link="VolumeTimelineView"
      />
      <HomeCard
        navigation={navigation}
        image={NETWORKGRAPH as any}
        title="Network Graph"
        description="Network graph of Enron key contact communication."
        link="NetworkGraphView"
      />
      <HomeCard
        navigation={navigation}
        image={TREEMAP as any}
        title="Tree Map"
        description="Tree map of email volume of Enron key contacts."
        link="TreeMapView"
      />
      <HomeCard
        navigation={navigation}
        image={EVENTTIMELINE as any}
        title="Event Timeline"
        description="Event timeline of Enron fraud and litigation."
        link="EventTimelineView"
      />
      <HomeCard
        navigation={navigation}
        image={POLAR as any}
        title="Polar"
        description="Polar chart of email volume of Enron key contacts."
        link="PolarView"
      />
      <HomeCard
        navigation={navigation}
        image={SEARCH as any}
        title="Search"
        description="Full text search with field filtering and hit highlighting."
        link="SearchView"
      />
      <HomeCard
        navigation={navigation}
        image={SETTINGS as any}
        title="Settings"
        description="Application settings."
        link="AppSettingsView"
      />
    </ScrollView>
  )
}
