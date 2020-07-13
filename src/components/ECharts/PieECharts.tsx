import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'

interface Contact {
  name: string
  total: number
  color: string
  handleClick: (field: string, name: string) => void
}

interface Props {
  title: string
  search: string
  data: Array<Contact>
}

export default function PieECharts({ title, search, data }: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)

  interface EChartsDatum {
    value: number
    name: string
    itemStyle: any
    handleClick: () => void
  }

  const contacts: Array<EChartsDatum> = []
  data.forEach((datum) => {
    contacts.push({
      name: datum.name,
      value: datum.total,
      handleClick: () => datum.handleClick(search, datum.name),
      itemStyle: {
        normal: {
          color: datum.color,
          lineStyle: {
            color: datum.color,
          },
          areaStyle: {
            color: datum.color,
          },
        },
      },
    })
  })

  const config = {
    title: {
      text: title,
      left: 'center',
      top: 20,
      textStyle: {
        color: darkMode ? 'white' : 'black',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    series: [
      {
        type: 'pie',
        radius: '55%',
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        data: contacts,
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function () {
          return Math.random() * 200
        },
      },
    ],
  }

  return (
    <View style={styles.container}>
      <ECharts option={config} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
