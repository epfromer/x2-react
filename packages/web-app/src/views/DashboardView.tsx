import Grid from '@material-ui/core/Grid'
import React from 'react'
import DashboardCard from '../components/DashboardCard'

export default function DashboardView() {
  const makeCard = (
    image: string,
    title: string,
    description: string,
    link: string
  ) => {
    return (
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard
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
        '/chord.png',
        'Chord',
        'Chord diagram of Enron key contact communication.',
        '/ChordView'
      )}
      {makeCard(
        '/wordcloud.png',
        'Word Cloud',
        'Word cloud of fraudulent project names.',
        '/WordCloudView'
      )}
      {makeCard(
        '/volumetimeline.png',
        'Volume Timeline',
        'XY timeline of Enron email per day with drill down.',
        '/VolumeTimelineView'
      )}
      {makeCard(
        '/networkgraph.png',
        'Network Graph',
        'Network graph of Enron key contact communication.',
        '/NetworkGraphView'
      )}
      {makeCard(
        '/treemap.png',
        'Tree Map',
        'Tree map of email volume of Enron key contacts.',
        '/TreeMapView'
      )}
      {makeCard(
        '/eventTimeline.png',
        'Event Timeline',
        'Event timeline of Enron fraud and litigation.',
        '/EventTimelineView'
      )}
      {makeCard(
        '/barchart.png',
        'Bar',
        'Bar chart of email volume of Enron key contacts.',
        '/BarView'
      )}
      {makeCard(
        '/polar.png',
        'Polar',
        'Polar chart of email volume of Enron key contacts.',
        '/PolarView'
      )}
      {makeCard(
        '/pie.png',
        'Pie',
        'Pie chart of email volume of Enron key contacts.',
        '/PieView'
      )}
      {makeCard(
        '/search.png',
        'Search',
        'Full text search with field filtering and hit highlighting.',
        '/SearchView'
      )}
    </Grid>
  )
}
