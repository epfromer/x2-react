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
import AppHeader from '../components/AppHeader'
import DashboardCard from '../components/DashboardCard'

interface Props {
  navigation: any
}
export default function DashboardView({ navigation }: Props) {
  return (
    <>
      <AppHeader title="Dashboard" />
      <ScrollView>
        <DashboardCard
          navigation={navigation}
          image={PIE}
          title="Pie"
          description="Pie chart of email volume of Enron key contacts."
          link="PieView"
        />
        <DashboardCard
          navigation={navigation}
          image={BARCHART}
          title="Bar"
          description="Bar chart of email volume of Enron key contacts."
          link="BarView"
        />
        <DashboardCard
          navigation={navigation}
          image={CHORD}
          title="Chord"
          description="Chord diagram of Enron key contact communication."
          link="ChordView"
        />
        <DashboardCard
          navigation={navigation}
          image={WORDCLOUD}
          title="Word Cloud"
          description="Word cloud of fraudulent project names."
          link="WordCloudView"
        />
        <DashboardCard
          navigation={navigation}
          image={VOLUMETIMELINE}
          title="Volume Timeline"
          description="XY timeline of Enron email per day with drill down."
          link="VolumeTimelineView"
        />
        <DashboardCard
          navigation={navigation}
          image={NETWORKGRAPH}
          title="Network Graph"
          description="Network graph of Enron key contact communication."
          link="NetworkGraphView"
        />
        <DashboardCard
          navigation={navigation}
          image={TREEMAP}
          title="Tree Map"
          description="Tree map of email volume of Enron key contacts."
          link="TreeMapView"
        />
        <DashboardCard
          navigation={navigation}
          image={EVENTTIMELINE}
          title="Event Timeline"
          description="Event timeline of Enron fraud and litigation."
          link="EventTimelineView"
        />
        <DashboardCard
          navigation={navigation}
          image={POLAR}
          title="Polar"
          description="Polar chart of email volume of Enron key contacts."
          link="PolarView"
        />
        <DashboardCard
          navigation={navigation}
          image={SEARCH}
          title="Search"
          description="Full text search with field filtering and hit highlighting."
          link="SearchView"
        />
      </ScrollView>
    </>
  )
}
