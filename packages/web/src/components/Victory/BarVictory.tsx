import { EmailXferedDatum } from '@klonzo/common'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from 'victory'

// https://formidable.com/open-source/victory/docs/victory-bar

const chartHeight = 100

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (key: string, value: string) => void
}
export default function BarVictory({
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
        height={chartHeight}
        padding={{ top: 20, left: 40, bottom: 15 }}
      >
        <VictoryLabel
          text={title}
          x={225}
          y={30}
          textAnchor="middle"
          style={[{ fill: theme.palette.text.primary, fontSize: 10 }]}
        />
        <VictoryAxis
          style={{
            tickLabels: {
              fill: theme.palette.text.primary,
              fontSize: 5,
              padding: 1,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              fill: theme.palette.text.primary,
              fontSize: 5,
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
          horizontal
          data={data.map((datum) => datum).reverse()}
          x="name"
          y="value"
          style={{
            data: {
              fill: ({ datum }) => datum.color,
            },
          }}
        />
      </VictoryChart>
      <button hidden onClick={onClick} data-testid="bar-victory"></button>
    </div>
  )
}
