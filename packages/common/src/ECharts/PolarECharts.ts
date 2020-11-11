import { EmailXferedDatum } from '../store/types'

export function getPolarEChartsConfig(
  textColor = 'black',
  title: string,
  data: Array<EmailXferedDatum>
): unknown {
  const chartData: Array<unknown> = data.map((datum) => ({
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
        color: textColor,
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
        color: textColor,
      },
    },
    series: [
      {
        type: 'pie',
        data: chartData,
        roseType: 'radius',
        label: {
          color: textColor,
        },
        labelLine: {
          lineStyle: {
            color: textColor,
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
