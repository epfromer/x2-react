import { EmailXferedDatum } from '../store/types'

interface HighChartsDatum {
  name: string
  y: number
  color: string
  events: unknown
}

export function getPieHighchartsConfig(
  textColor = 'black',
  title: string,
  search: string,
  data: Array<EmailXferedDatum>,
  backgroundColor: string,
  handleClick: (key: string, value: string) => void
): unknown {
  const custodians: Array<HighChartsDatum> = []
  data.forEach((datum) => {
    custodians.push({
      name: datum.name,
      y: datum.value,
      color: datum.color,
      events: {
        click: (e: unknown) => handleClick(search, datum.name),
      },
    })
  })

  return {
    chart: {
      type: 'pie',
      backgroundColor,
    },
    title: {
      text: title,
      style: {
        color: textColor,
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        data: custodians,
      },
    ],
  }
}
