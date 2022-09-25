import { EmailXferedDatum } from '../store/types'

export function getPieHighchartsConfig(
  textColor = 'black',
  title: string,
  search: string,
  data: Array<EmailXferedDatum>,
  backgroundColor: string,
  handleClick: (key: string, value: string) => void
): unknown {
  const custodians = data.map((datum) => ({
    name: datum.name,
    y: datum.value,
    color: datum.color,
    events: {
      click: (e: unknown) => handleClick(search, datum.name),
    },
  }))

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
      pointFormat: '{point.percentage:.1f}%',
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
          format: '{point.name}',
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
