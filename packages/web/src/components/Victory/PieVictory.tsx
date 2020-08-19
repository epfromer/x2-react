import { EmailXferedDatum, selectDarkMode } from '@klonzo/common'
import React from 'react'
import { useSelector } from 'react-redux'
import { VictoryPie } from 'victory'

// https://formidable.com/open-source/victory/docs/victory-pie/

const chartHeight = 320

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (field: string, name: string) => void
}
export default function PieVictory({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const darkMode = useSelector(selectDarkMode)

  const onClick = () => {
    return [
      {
        mutation: (props: any) => handleClick(search, props.datum.xName),
      },
    ]
  }

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
              onClick,
            },
          },
        ]}
      />
      <button hidden onClick={onClick} data-testid="pie-victory"></button>
    </div>
  )
}
