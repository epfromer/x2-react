import { EmailXferedDatum } from '../store/types'

export function getTreeMapEChartsConfig(
  textColor = 'black',
  title: string,
  data: Array<EmailXferedDatum>
): unknown {
  const chartData = data.map((datum) => ({
    name: datum.name,
    value: datum.value,
    itemStyle: { color: datum.color },
  }))

  return {
    title: {
      text: title,
      left: 'center',
      textStyle: { color: textColor },
    },
    series: [
      {
        type: 'treemap',
        data: chartData,
        animationEasing: 'quinticInOut',
        animationDuration: 1500,
        animationDelay: () => Math.random() * 200,
      },
    ],
  }
}
