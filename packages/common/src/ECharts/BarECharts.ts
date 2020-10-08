import { EChartsDatum, EmailXferedDatum } from '../store/types'

export function getBarEChartsConfig(
  textColor = 'black',
  title: string,
  data: Array<EmailXferedDatum>,
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
        color: textColor,
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
        color: textColor,
      },
    },
    yAxis: {
      data: data.map((datum) => datum.name),
      axisLabel: {
        color: textColor,
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
