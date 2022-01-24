import React from 'react'
import HomeCard from '../components/HomeCard'
import pie from './img/pie.png'
import barchart from './img/barchart.png'
import chord from './img/chord.png'
import wordcloud from './img/wordcloud.png'
import volumetimeline from './img/volumetimeline.png'
import networkgraph from './img/networkgraph.png'
import treemap from './img/treemap.png'
import eventtimeline from './img/eventtimeline.png'
import { Grid } from '@mui/material'

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
      {makeCard(pie, 'Pie', 'Enron custodian email volume.', '/PieView')}
      {makeCard(barchart, 'Bar', 'Enron custodian email volume.', '/BarView')}
      {makeCard(chord, 'Chord', 'Enron custodian communication.', '/ChordView')}
      {makeCard(
        wordcloud,
        'Word Cloud',
        'Fraudulent project names.',
        '/WordCloudView'
      )}
      {makeCard(
        volumetimeline,
        'Volume Timeline',
        'Enron email per day.',
        '/VolumeTimelineView'
      )}
      {makeCard(
        networkgraph,
        'Network Graph',
        'Enron custodian communication.',
        '/NetworkGraphView'
      )}
      {makeCard(
        treemap,
        'Tree Map',
        'Enron custodian email volume.',
        '/TreeMapView'
      )}
      {makeCard(
        eventtimeline,
        'Event Timeline',
        'Enron fraud & litigation events.',
        '/EventTimelineView'
      )}
    </Grid>
  )
}
