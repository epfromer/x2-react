import { EmailXferedDatum } from '@klonzo/common'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'
import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPolarAxis,
  VictoryZoomContainer,
} from 'victory'

// https://formidable.com/open-source/victory/docs/victory-polar-axis

const chartHeight = 300

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (field: string, name: string) => void
}
export default function PolarVictory({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const theme = useTheme()

  const onClick = () => [
    {
      mutation: (props: any) => handleClick(search, props.datum.xName),
    },
  ]

  return (
    <div>
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
          style={[{ fill: theme.palette.text.primary, fontSize: 15 }]}
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
              fill: theme.palette.text.primary,
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
                onClick,
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
      <button hidden onClick={onClick} data-testid="polar-victory"></button>
    </div>
  )
}
