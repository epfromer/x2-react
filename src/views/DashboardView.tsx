import { Body, Card, CardItem } from 'native-base'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text } from 'react-native'
import AppHeader from '../components/AppHeader'
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
} from '../image/index'

// https://docs.nativebase.io/Components.html#card-headfoot-headref

interface Props {
  navigation: any
}
export default function DashboardView({ navigation }: Props) {
  const makeCard = (
    image: any,
    title: string,
    description: string,
    view: string
  ) => {
    return (
      <Card>
        <CardItem header>
          <Text style={styles.title}>{title}</Text>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={image}
            style={{ height: 200, width: null, flex: 1 } as any}
          />
        </CardItem>
        <CardItem>
          <Body>
            <Text>{description}</Text>
          </Body>
        </CardItem>
        <CardItem footer button onPress={() => navigation.navigate(view)}>
          <Text>{'Explore ' + title}</Text>
        </CardItem>
      </Card>
    )
  }

  return (
    <>
      <AppHeader title="Dashboard" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {makeCard(
          CHORD,
          'Chord',
          'Chord diagram of Enron key contact communication.',
          'ChordView'
        )}
        {makeCard(
          WORDCLOUD,
          'Word Cloud',
          'Word cloud of fraudulent project names.',
          'WordCloudView'
        )}
        {makeCard(
          VOLUMETIMELINE,
          'Volume Timeline',
          'XY timeline of Enron email per day with drill down.',
          'VolumeTimelineView'
        )}
        {makeCard(
          NETWORKGRAPH,
          'Network Graph',
          'Network graph of Enron key contact communication.',
          'NetworkGraphView'
        )}
        {makeCard(
          TREEMAP,
          'Tree Map',
          'Tree map of email volume of Enron key contacts.',
          'TreeMapView'
        )}
        {makeCard(
          EVENTTIMELINE,
          'Event Timeline',
          'Event timeline of Enron fraud and litigation.',
          'EventTimelineView'
        )}
        {makeCard(
          BARCHART,
          'Bar',
          'Bar chart of email volume of Enron key contacts.',
          'BarView'
        )}
        {makeCard(
          POLAR,
          'Polar',
          'Polar chart of email volume of Enron key contacts.',
          'PolarView'
        )}
        {makeCard(
          PIE,
          'Pie',
          'Pie chart of email volume of Enron key contacts.',
          'PieView'
        )}
        {makeCard(
          SEARCH,
          'Search',
          'Full text search with field filtering and hit highlighting.',
          'SearchView'
        )}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
})
