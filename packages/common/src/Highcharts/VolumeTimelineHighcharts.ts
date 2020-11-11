import { EmailSentByDay } from '../store/types'

export function getVolumeTimeHighchartsConfig(
  textColor = 'black',
  title: string,
  data: Array<EmailSentByDay>,
  backgroundColor: string,
  handleClick: (date: string) => void
): unknown {
  return {
    chart: {
      zoomType: 'x',
      backgroundColor,
    },
    title: {
      text: title,
      style: {
        color: textColor,
      },
    },
    xAxis: {
      labels: {
        overflow: 'justify',
        style: {
          color: textColor,
        },
      },
      type: 'datetime',
    },
    yAxis: {
      labels: {
        overflow: 'justify',
        style: {
          color: textColor,
        },
      },
      title: {
        text: '# emails sent',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        events: {
          click: (e: any) =>
            handleClick(new Date(e.point.category).toISOString().slice(0, 10)),
        },
      },
    },
    series: [
      {
        type: 'area',
        name: '# emails sent',
        data: data.map((stat) => [new Date(stat.sent).getTime(), stat.total]),
      },
    ],
  }
}
