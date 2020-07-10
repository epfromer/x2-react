import { Body, Card, CardItem } from 'native-base'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text } from 'react-native'
import { useHistory } from 'react-router-native'
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

export default function DashboardView() {
  let history = useHistory()

  const handleClick = (link: string) => history.push(link)

  const makeCard = (
    image: any,
    title: string,
    description: string,
    link: string
  ) => {
    return (
      <Card>
        <CardItem header onPress={() => handleClick(link)}>
          <Text style={styles.cartTitle}>{title}</Text>
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
        <CardItem footer button onPress={() => handleClick(link)}>
          <Text>{'Explore ' + title}</Text>
        </CardItem>
      </Card>
    )
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      {makeCard(
        CHORD,
        'Chord',
        'Chord diagram of Enron key contact communication.',
        '/ChordView'
      )}
      {makeCard(
        WORDCLOUD,
        'Word Cloud',
        'Word cloud of fraudulent project names.',
        '/WordCloudView'
      )}
      {makeCard(
        VOLUMETIMELINE,
        'Volume Timeline',
        'XY timeline of Enron email per day with drill down.',
        '/VolumeTimelineView'
      )}
      {makeCard(
        NETWORKGRAPH,
        'Network Graph',
        'Network graph of Enron key contact communication.',
        '/NetworkGraphView'
      )}
      {makeCard(
        TREEMAP,
        'Tree Map',
        'Tree map of email volume of Enron key contacts.',
        '/TreeMapView'
      )}
      {makeCard(
        EVENTTIMELINE,
        'Event Timeline',
        'Event timeline of Enron fraud and litigation.',
        '/EventTimelineView'
      )}
      {makeCard(
        BARCHART,
        'Bar',
        'Bar chart of email volume of Enron key contacts.',
        '/BarView'
      )}
      {makeCard(
        POLAR,
        'Polar',
        'Polar chart of email volume of Enron key contacts.',
        '/PolarView'
      )}
      {makeCard(
        PIE,
        'Pie',
        'Pie chart of email volume of Enron key contacts.',
        '/PieView'
      )}
      {makeCard(
        SEARCH,
        'Search',
        'Full text search with field filtering and hit highlighting.',
        '/SearchView'
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  cartTitle: {
    fontSize: 20,
  },
})
