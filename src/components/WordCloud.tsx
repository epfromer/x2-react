import React from 'react'
import Cloud from 'react-native-word-cloud'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://www.npmjs.com/package/react-native-word-cloud

// TODO build better word cloud for RN, publish to NPM?

interface Word {
  name: string
  weight: number
}

interface Props {
  title: string
  words: Array<Word>
  handleClick: (word: string) => void
}

export default function WordCloud({ title, words, handleClick }: Props) {
  const kwords: Array<any> = []
  words.forEach((word) => {
    kwords.push({
      keyword: word.name,
      frequency: word.weight,
      color:
        'rgb(' +
        [
          Math.round(Math.random() * 160),
          Math.round(Math.random() * 160),
          Math.round(Math.random() * 160),
        ].join(',') +
        ')',
    })
  })

  return (
    <Cloud keywords={kwords} scale={250} containerCircleColor={'#345678'} />
  )
}
