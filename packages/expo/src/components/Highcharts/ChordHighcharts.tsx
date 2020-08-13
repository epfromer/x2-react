import HighchartsReactNative from '@highcharts/highcharts-react-native'
import { RootState } from '@klonzo/common'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

// https://www.highcharts.com/docs/chart-and-series-types/dependency-wheel

const chartHeight = '95%'

interface Props {
  title: string
  data: Array<any>
  nodes: Array<any>
  handleClick: (from: string, to: string) => void
}

export default function ChordHighcharts({
  title,
  data,
  nodes,
  handleClick,
}: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const modules = ['dependency-wheel', 'sankey', 'exporting', 'export-data']
  const config = {
    title: {
      text: 'Highcharts Dependency Wheel',
    },

    accessibility: {
      point: {
        valueDescriptionFormat:
          '{index}. From {point.from} to {point.to}: {point.weight}.',
      },
    },

    series: [
      {
        keys: ['from', 'to', 'weight'],
        data: [
          ['Brazil', 'Portugal', 5],
          ['Brazil', 'France', 1],
          ['Brazil', 'Spain', 1],
          ['Brazil', 'England', 1],
          ['Canada', 'Portugal', 1],
          ['Canada', 'France', 5],
          ['Canada', 'England', 1],
          ['Mexico', 'Portugal', 1],
          ['Mexico', 'France', 1],
          ['Mexico', 'Spain', 5],
          ['Mexico', 'England', 1],
          ['USA', 'Portugal', 1],
          ['USA', 'France', 1],
          ['USA', 'Spain', 1],
          ['USA', 'England', 5],
          ['Portugal', 'Angola', 2],
          ['Portugal', 'Senegal', 1],
          ['Portugal', 'Morocco', 1],
          ['Portugal', 'South Africa', 3],
          ['France', 'Angola', 1],
          ['France', 'Senegal', 3],
          ['France', 'Mali', 3],
          ['France', 'Morocco', 3],
          ['France', 'South Africa', 1],
          ['Spain', 'Senegal', 1],
          ['Spain', 'Morocco', 3],
          ['Spain', 'South Africa', 1],
          ['England', 'Angola', 1],
          ['England', 'Senegal', 1],
          ['England', 'Morocco', 2],
          ['England', 'South Africa', 7],
          ['South Africa', 'China', 5],
          ['South Africa', 'India', 1],
          ['South Africa', 'Japan', 3],
          ['Angola', 'China', 5],
          ['Angola', 'India', 1],
          ['Angola', 'Japan', 3],
          ['Senegal', 'China', 5],
          ['Senegal', 'India', 1],
          ['Senegal', 'Japan', 3],
          ['Mali', 'China', 5],
          ['Mali', 'India', 1],
          ['Mali', 'Japan', 3],
          ['Morocco', 'China', 5],
          ['Morocco', 'India', 1],
          ['Morocco', 'Japan', 3],
          ['Japan', 'Brazil', 1],
        ],
        type: 'dependencywheel',
        name: 'Dependency wheel series',
        dataLabels: {
          color: '#333',
          textPath: {
            enabled: true,
            attributes: {
              dy: 5,
            },
          },
          distance: 10,
        },
      },
    ],
  }

  return (
    <HighchartsReactNative
      options={config}
      modules={modules}
      loader={true}
      style={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
  },
})
