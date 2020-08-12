import { EmailXferedDatum } from '../store/types'

export function getTreeMapEChartsConfig(
  darkMode: boolean,
  title: string,
  data: Array<EmailXferedDatum>
) {
  const chartData: Array<any> = data.map((datum: any) => ({
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
        color: darkMode ? 'white' : 'black',
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
