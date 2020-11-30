import { EmailXferedDatum } from '../store/types'

export function getBarHighchartsConfig(
  textColor = 'black',
  title: string,
  search: string,
  data: Array<EmailXferedDatum>,
  backgroundColor: string,
  handleClick: (key: string, value: string) => void
): unknown {
  return {
    chart: {
      type: 'bar',
      backgroundColor,
    },
    title: {
      text: title,
      style: {
        color: textColor,
      },
    },
    xAxis: {
      categories: data.map((datum) => datum.name),
      title: {
        text: null,
      },
      labels: {
        style: {
          color: textColor,
        },
      },
    },
    yAxis: {
      labels: {
        overflow: 'justify',
        style: {
          color: textColor,
        },
      },
      title: {
        text: null,
      },
    },
    tooltip: {
      valueSuffix: ' email',
    },
    plotOptions: {
      bar: {
        events: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          click: (e: any) => handleClick(search, e.point.category),
        },
      },
    },
    series: [
      {
        showInLegend: false,
        colorByPoint: true,
        colors: data.map((datum) => datum.color),
        data: data.map((datum) => datum.value),
      },
    ],
  }
}
