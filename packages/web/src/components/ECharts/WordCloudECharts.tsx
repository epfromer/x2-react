import { WordCloudTag } from '@klonzo/common'
import { useTheme } from '@mui/material/styles'
import ReactEcharts from 'echarts-for-react'
import 'echarts-wordcloud'
import React from 'react'

// https://www.npmjs.com/package/echarts-wordcloud

const chartHeight = '500px'

interface Props {
  title: string
  data: Array<WordCloudTag>
  handleClick: (word: string) => void
}
export default function WordCloudECharts({ title, data, handleClick }: Props) {
  const theme = useTheme()
  return (
    <ReactEcharts
      style={{ height: chartHeight, width: '100%' }}
      onEvents={{
        click: (e: any) => handleClick(e.data.name),
      }}
      option={{
        title: {
          text: title,
          top: 20,
          left: 'center',
          textStyle: {
            color: theme.palette.text.primary,
          },
        },
        series: [
          {
            type: 'wordCloud',
            shape: 'circle',
            maskImage: undefined,
            left: 'center',
            top: 'center',
            width: '90%',
            height: '80%',
            right: null,
            bottom: null,
            sizeRange: [12, 60],
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: 18,
            drawOutOfBound: false,
            textStyle: {
              normal: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                color: function () {
                  // Random color
                  return (
                    'rgb(' +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                    ].join(',') +
                    ')'
                  )
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333',
              },
            },
            data: data.map((word) => ({
              name: word.tag,
              value: word.weight,
            })),
          },
        ],
      }}
    />
  )
}
