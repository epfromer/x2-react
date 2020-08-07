import {
  BARCHART,
  CHORD,
  EVENTTIMELINE,
  NETWORKGRAPH,
  PIE,
  POLAR,
  SEARCH,
  TREEMAP,
  VOLUMETIMELINE,
  WORDCLOUD,
} from '@x2react/shared'
import React from 'react'
import { ScrollView } from 'react-native'
import HomeCard from '../components/HomeCard'

interface Props {
  navigation: any
}
export default function HomeView({ navigation }: Props) {
  return (
    <>
      <ScrollView>
        <HomeCard
          navigation={navigation}
          image={PIE}
          title="Pie"
          description="Pie chart of email volume of Enron key contacts."
          link="PieView"
        />
        <HomeCard
          navigation={navigation}
          image={BARCHART}
          title="Bar"
          description="Bar chart of email volume of Enron key contacts."
          link="BarView"
        />
        <HomeCard
          navigation={navigation}
          image={CHORD}
          title="Chord"
          description="Chord diagram of Enron key contact communication."
          link="ChordView"
        />
        <HomeCard
          navigation={navigation}
          image={WORDCLOUD}
          title="Word Cloud"
          description="Word cloud of fraudulent project names."
          link="WordCloudView"
        />
        <HomeCard
          navigation={navigation}
          image={VOLUMETIMELINE}
          title="Volume Timeline"
          description="XY timeline of Enron email per day with drill down."
          link="VolumeTimelineView"
        />
        <HomeCard
          navigation={navigation}
          image={NETWORKGRAPH}
          title="Network Graph"
          description="Network graph of Enron key contact communication."
          link="NetworkGraphView"
        />
        <HomeCard
          navigation={navigation}
          image={TREEMAP}
          title="Tree Map"
          description="Tree map of email volume of Enron key contacts."
          link="TreeMapView"
        />
        <HomeCard
          navigation={navigation}
          image={EVENTTIMELINE}
          title="Event Timeline"
          description="Event timeline of Enron fraud and litigation."
          link="EventTimelineView"
        />
        <HomeCard
          navigation={navigation}
          image={POLAR}
          title="Polar"
          description="Polar chart of email volume of Enron key contacts."
          link="PolarView"
        />
        <HomeCard
          navigation={navigation}
          image={SEARCH}
          title="Search"
          description="Full text search with field filtering and hit highlighting."
          link="SearchView"
        />
        <HomeCard
          navigation={navigation}
          image={SEARCH}
          title="Settings"
          description="Application settings."
          link="AppSettingsView"
        />
      </ScrollView>
    </>
  )
}
