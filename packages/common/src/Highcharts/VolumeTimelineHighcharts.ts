import { EmailSentByDayDatum } from '../store/types'

export function getVolumeTimeHighchartsConfig(
  darkMode: boolean,
  title: string,
  data: Array<EmailSentByDayDatum>,
  backgroundColor: string,
  handleClick: (date: string) => void
) {
  const dailyTotals: Array<[number, number]> = data.map((stat) => [
    new Date(stat.sent).getTime(),
    stat.value,
  ])

  return {
    chart: {
      zoomType: 'x',
      backgroundColor,
    },
    title: {
      text: title,
      style: {
        color: darkMode ? 'white' : 'black',
      },
    },
    xAxis: {
      labels: {
        overflow: 'justify',
        style: {
          color: darkMode ? 'white' : 'black',
        },
      },
      type: 'datetime',
    },
    yAxis: {
      labels: {
        overflow: 'justify',
        style: {
          color: darkMode ? 'white' : 'black',
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
        data: dailyTotals,
      },
    ],
  }
}
