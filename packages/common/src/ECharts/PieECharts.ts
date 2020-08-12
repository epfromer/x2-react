import { EChartsDatum, EmailXferedDatum } from '../store/types'

export function getPieEChartsConfig(
  darkMode: boolean,
  title: string,
  data: Array<EmailXferedDatum>
) {
  const chartData: Array<EChartsDatum> = []
  data.forEach((datum) => {
    chartData.push({
      name: datum.name,
      value: datum.value,
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

  return {
    title: {
      text: title,
      top: 20,
      left: 'center',
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
        data: chartData,
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: () => Math.random() * 200,
      },
    ],
  }
}
