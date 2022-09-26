import { useTheme } from '@mui/material/styles'
import { Bar } from 'react-chartjs-2'
import { EmailXferedDatum } from '../../common'

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (key: string, value: string) => void
}
export default function BarChartJS({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const theme = useTheme()

  const options: any = {
    indexAxis: 'y' as const,
    plugins: {
      title: {
        display: true,
        padding: { bottom: 10 },
        color: theme.palette.text.primary,
        font: { size: 18 },
        text: title,
      },
      legend: {
        display: false,
      },
    },
    onClick: (e: any, item: any) => {
      if (item && item.length > 0) {
        handleClick(search, data[item[0].index].name)
      }
    },
    scales: {
      x: {
        ticks: {
          color: theme.palette.text.primary,
        },
      },
      y: {
        ticks: {
          color: theme.palette.text.primary,
        },
      },
    },
  }

  const chartData: any = {
    labels: data.map((datum) => datum.name),
    datasets: [
      {
        label: title,
        backgroundColor: data.map((datum) => datum.color),
        data: data.map((datum) => datum.value),
      },
    ],
  }

  return <Bar options={options} data={chartData} />
}
