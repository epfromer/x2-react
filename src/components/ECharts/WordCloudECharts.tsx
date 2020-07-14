import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'
import { Text } from 'react-native'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://www.npmjs.com/package/echarts-wordcloud

interface Props {
  title: string
  words: Array<[string]>
  handleClick: (word: string) => void
}

export default function WordCloudEharts({ title, words, handleClick }: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)

  // function onData(name: string) {
  //   data[0].handleClick(search, name)
  // }

  const additionalCode = `chart.on('click', p => sendData(p.data.name));`

  const config = {
    title: {
      text: title,
      top: 20,
      left: 'center',
      textStyle: {
        color: darkMode ? 'white' : 'black',
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
        data: wordCloud,
      },
    ],
  }

  return (
    // <ECharts onData={onData} additionalCode={additionalCode} option={config} />
    <Text>foo</Text>
  )
}
