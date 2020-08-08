import React from 'react'
import { useSelector } from 'react-redux'
import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPolarAxis,
  VictoryZoomContainer,
} from 'victory'
import { EmailXferedDatum, RootState } from '../../store/types'

// https://formidable.com/open-source/victory/docs/victory-polar-axis

const chartHeight = 300

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (field: string, name: string) => void
}

const PolarVictory: React.FC<Props> = ({
  title,
  search,
  data,
  handleClick,
}) => {
  const darkMode = useSelector((state: RootState) => state.darkMode)

  return (
    <VictoryChart
      polar
      height={chartHeight}
      containerComponent={<VictoryZoomContainer />}
    >
      <VictoryLabel
        text={title}
        x={180}
        y={30}
        textAnchor="middle"
        style={[{ fill: darkMode ? 'white' : 'black', fontSize: 15 }]}
      />
      <VictoryPolarAxis
        dependentAxis
        style={{
          tickLabels: {
            fill: 'none',
            fontSize: 5,
            padding: 1,
          },
        }}
      />
      <VictoryPolarAxis
        labelPlacement="vertical"
        style={{
          tickLabels: {
            fill: darkMode ? 'white' : 'black',
            fontSize: 10,
            padding: 1,
          },
        }}
      />
      <VictoryBar
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        events={[
          {
            target: 'data',
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    mutation: (props: any) => {
                      handleClick(search, props.datum.xName)
                      return null
                    },
                  },
                ]
              },
            },
          },
        ]}
        data={data}
        x="name"
        y="value"
        style={{
          data: {
            fill: ({ datum }) => datum.color,
          },
        }}
      />
    </VictoryChart>
  )
}

export default PolarVictory
