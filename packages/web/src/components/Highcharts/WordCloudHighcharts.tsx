import { WordCloudTag } from '@klonzo/common'
import { useTheme } from '@material-ui/core/styles'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartWordCloud from 'highcharts/modules/wordcloud'
import React from 'react'

HighchartWordCloud(Highcharts)

const chartHeight = '500px'

// @ts-ignore
Highcharts.seriesTypes.wordcloud.prototype.deriveFontSize = function (
  relativeWeight: number
) {
  const minFontSize = 5
  const maxFontSize = 25
  return Math.floor(minFontSize + (maxFontSize - minFontSize) * relativeWeight)
}

interface Props {
  title: string
  data: Array<WordCloudTag>
  handleClick: (word: string) => void
}
export default function WordCloudHighcharts({
  title,
  data,
  handleClick,
}: Props) {
  const theme = useTheme()

  const config = {
    chart: {
      height: chartHeight,
      backgroundColor: theme.palette.background.default,
    },
    title: {
      text: title,
      style: {
        color: theme.palette.text.primary,
      },
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        events: {
          click: (e: any) => handleClick(e.point.name),
        },
      },
    },
    series: [
      {
        type: 'wordcloud',
        name: 'Occurrences',
        data: data.map((word) => ({
          name: word.tag,
          weight: word.weight,
        })),
      },
    ],
  }

  return <HighchartsReact highcharts={Highcharts} options={config} />
}
