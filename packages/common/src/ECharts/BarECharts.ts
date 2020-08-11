import { EChartsDatum, EmailXferedDatum } from '../store/types'

export function getBarEChartsConfig(
  darkMode: boolean,
  data: Array<EmailXferedDatum>,
  title: string,
  gridConfig: any
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
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: gridConfig,
    xAxis: {
      axisLabel: {
        color: darkMode ? 'white' : 'black',
      },
    },
    yAxis: {
      data: data.map((datum) => datum.name),
      axisLabel: {
        color: darkMode ? 'white' : 'black',
      },
    },
    series: [
      {
        type: 'bar',
        data: chartData,
      },
    ],
  }
}
