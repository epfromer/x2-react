import { EmailXferedDatum } from '../store/types'

interface HighChartsDatum {
  name: string
  y: number
  color: string
  events: any
}

export function getPieHighchartsConfig(
  darkMode: boolean,
  title: string,
  search: string,
  data: Array<EmailXferedDatum>,
  backgroundColor: string,
  handleClick: (key: string, value: string) => void
) {
  const contacts: Array<HighChartsDatum> = []
  data.forEach((datum) => {
    contacts.push({
      name: datum.name,
      y: datum.value,
      color: datum.color,
      events: {
        click: (e: any) => handleClick(search, datum.name),
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
        color: darkMode ? 'white' : 'black',
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
        data: contacts,
      },
    ],
  }
}
