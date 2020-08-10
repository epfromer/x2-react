import React from 'react'
import { useSelector } from 'react-redux'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from 'victory'
import { EmailXferedDatum, RootState } from '../../store/types'

// https://formidable.com/open-source/victory/docs/victory-bar

const chartHeight = 100

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (key: string, value: string) => void
}

const BarVictory: React.FC<Props> = ({ title, search, data, handleClick }) => {
  const darkMode = useSelector((state: RootState) => state.darkMode)

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
          style={[{ fill: darkMode ? 'white' : 'black', fontSize: 10 }]}
        />
        <VictoryAxis
          style={{
            tickLabels: {
              fill: darkMode ? 'white' : 'black',
              fontSize: 5,
              padding: 1,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              fill: darkMode ? 'white' : 'black',
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
          horizontal
          data={data.reverse()}
          x="name"
          y="value"
          style={{
            data: {
              fill: ({ datum }) => datum.color,
            },
          }}
        />
      </VictoryChart>
    </div>
  )
}

export default BarVictory
