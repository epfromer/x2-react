import React from 'react'
import { useSelector } from 'react-redux'
import { VictoryPie } from 'victory'
import { EmailXferedDatum, RootState } from '../../store/types'

// https://formidable.com/open-source/victory/docs/victory-pie/

const chartHeight = 320

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (field: string, name: string) => void
}

const PieVictory: React.FC<Props> = ({ title, search, data, handleClick }) => {
  const darkMode = useSelector((state: RootState) => state.darkMode)

  return (
    <div>
      <VictoryPie
        animate
        data={data}
        x="name"
        y="value"
        height={chartHeight}
        style={{
          data: {
            fill: ({ datum }) => datum.color,
          },
          labels: {
            fill: darkMode ? 'white' : 'black',
            fontSize: 10,
          },
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
      />
    </div>
  )
}

export default PieVictory
