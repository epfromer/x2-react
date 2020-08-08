import Grid from '@material-ui/core/Grid'
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
import HomeCard from '../components/HomeCard'

export default function HomeView() {
  const makeCard = (
    image: string,
    title: string,
    description: string,
    link: string
  ) => {
    return (
      <Grid item xs={12} sm={6} md={3}>
        <HomeCard
          image={image}
          title={title}
          description={description}
          link={link}
        />
      </Grid>
    )
  }

  return (
    <Grid container spacing={3}>
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
    </Grid>
  )
}
