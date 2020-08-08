import ReactEcharts from 'echarts-for-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, TotalEmailSentDatum } from '../../store/types'

// https://echarts.apache.org/examples/en/index.html#chart-type-bar

const chartHeight = '500px'

interface Props {
  title: string
  data: Array<TotalEmailSentDatum>
  handleClick: (date: string) => void
}

const VolumeTimelineECharts: React.FC<Props> = ({
  title,
  data,
  handleClick,
}) => {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )

  return (
    <ReactEcharts
      style={{ height: chartHeight, width: '100%' }}
      onEvents={{
        click: (e: any) => handleClick(e.name),
      }}
      option={{
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
            color: themePrimaryColor,
            data: data.map((datum) => datum.value),
          },
        ],
      }}
    />
  )
}

export default VolumeTimelineECharts
