import Grid from '@material-ui/core/Grid'
import React from 'react'
import HomeCard from '../components/HomeCard'
import pie from './img/pie.png'
import barchart from './img/barchart.png'
import chord from './img/chord.png'
import wordcloud from './img/wordcloud.png'
import volumetimeline from './img/volumetimeline.png'
import networkgraph from './img/networkgraph.png'
import treemap from './img/treemap.png'
import eventTimeline from './img/eventTimeline.png'
import polar from './img/polar.png'
import search from './img/search.png'

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
        pie,
        'Pie',
        'Pie chart of email volume of Enron key custodians.',
        '/PieView'
      )}
      {makeCard(
        barchart,
        'Bar',
        'Bar chart of email volume of Enron key custodians.',
        '/BarView'
      )}
      {makeCard(
        chord,
        'Chord',
        'Chord diagram of Enron key custodian communication.',
        '/ChordView'
      )}
      {makeCard(
        wordcloud,
        'Word Cloud',
        'Word cloud of fraudulent project names.',
        '/WordCloudView'
      )}
      {makeCard(
        volumetimeline,
        'Volume Timeline',
        'XY timeline of Enron email per day with drill down.',
        '/VolumeTimelineView'
      )}
      {makeCard(
        networkgraph,
        'Network Graph',
        'Network graph of Enron key custodian communication.',
        '/NetworkGraphView'
      )}
      {makeCard(
        treemap,
        'Tree Map',
        'Tree map of email volume of Enron key custodians.',
        '/TreeMapView'
      )}
      {makeCard(
        eventTimeline,
        'Event Timeline',
        'Event timeline of Enron fraud and litigation.',
        '/EventTimelineView'
      )}
      {makeCard(
        polar,
        'Polar',
        'Polar chart of email volume of Enron key custodians.',
        '/PolarView'
      )}
      {makeCard(
        search,
        'Search',
        'Full text search with field filtering and hit highlighting.',
        '/SearchView'
      )}
    </Grid>
  )
}
