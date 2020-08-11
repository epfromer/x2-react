import { EmailXferedDatum } from '../store/types'

export function getPolarEChartsConfig(
  darkMode: boolean,
  title: string,
  data: Array<EmailXferedDatum>
) {
  const chartData: Array<any> = data.map((datum) => ({
    value: datum.value,
    name: datum.name,
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
      formatter: '{b} : {c} ({d}%)',
    },
    legend: {
      show: true,
      bottom: 0,
      textStyle: {
        color: darkMode ? 'white' : 'black',
      },
    },
    series: [
      {
        type: 'pie',
        data: chartData,
        roseType: 'radius',
        label: {
          color: 'rgba(255, 255, 255, 0.3)',
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: () => Math.random() * 200,
      },
    ],
  }
}
