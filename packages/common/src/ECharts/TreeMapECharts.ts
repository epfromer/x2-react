import { EmailXferedDatum } from '../store/types'

export function getTreeMapEChartsConfig(
  textColor = 'black',
  title: string,
  data: Array<EmailXferedDatum>
): unknown {
  const chartData: Array<unknown> = data.map((datum) => ({
    name: datum.name,
    value: datum.value,
    itemStyle: {
      color: datum.color,
    },
  }))

  return {
    title: {
      text: title,
      left: 'center',
      textStyle: {
        color: textColor,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}',
    },
    series: [
      {
        type: 'treemap',
        data: chartData,
      },
    ],
  }
}
