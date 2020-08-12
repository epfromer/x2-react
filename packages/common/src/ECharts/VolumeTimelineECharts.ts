import { TotalEmailSentDatum } from '../store/types'

export function getVolumeTimelineEChartsConfig(
  darkMode: boolean,
  title: string,
  data: Array<TotalEmailSentDatum>
) {
  return {
    title: {
      text: title,
      left: 'center',
      textStyle: {
        color: darkMode ? 'white' : 'black',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      bottom: 90,
    },
    dataZoom: [
      {
        type: 'inside',
      },
      {
        type: 'slider',
      },
    ],
    xAxis: {
      data: data.map((datum) => datum.sent),
      silent: false,
      splitLine: {
        show: false,
      },
      splitArea: {
        show: false,
      },
      axisLabel: {
        color: darkMode ? 'white' : 'black',
      },
    },
    yAxis: {
      splitArea: {
        show: false,
      },
      axisLabel: {
        color: darkMode ? 'white' : 'black',
      },
    },
    series: [
      {
        type: 'bar',
        data: data.map((datum) => datum.value),
      },
    ],
  }
}
