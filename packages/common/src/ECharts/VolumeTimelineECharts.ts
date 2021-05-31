import { EmailSentByDay } from '../store/types'

export function getVolumeTimelineEChartsConfig(
  textColor = 'black',
  title: string,
  data: Array<EmailSentByDay>
): unknown {
  return {
    title: {
      text: title,
      left: 'center',
      textStyle: { color: textColor },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    grid: {
      bottom: 90,
    },
    dataZoom: [{ type: 'inside' }, { type: 'slider' }],
    xAxis: {
      data: data.map((datum) => datum.sent),
      silent: false,
      splitLine: { show: false },
      splitArea: { show: false },
      axisLabel: { color: textColor },
    },
    yAxis: {
      splitArea: { show: false },
      axisLabel: { color: textColor },
    },
    series: [
      {
        type: 'bar',
        data: data.map((datum) => datum.total),
      },
    ],
  }
}
