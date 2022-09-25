import { EmailXferedDatum } from '@klonzo/common'
import { useTheme } from '@mui/material/styles'
import { Pie } from 'react-chartjs-2'

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}
export default function PieChartJS({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const theme = useTheme()

  const options: any = {
    plugins: {
      title: {
        display: true,
        padding: { bottom: 10 },
        color: theme.palette.text.primary,
        font: { size: 18 },
        text: title,
      },
    },
    legend: {
      position: 'bottom',
      labels: {
        color: theme.palette.text.primary,
      },
    },
    onClick: (e: any, item: any) => {
      if (item && item.length > 0) {
        handleClick(search, data[item[0].index].name)
      }
    },
  }

  const chartData: any = {
    labels: data.map((datum) => datum.name),
    datasets: [
      {
        backgroundColor: data.map((datum) => datum.color),
        data: data.map((datum) => datum.value),
      },
    ],
  }

  return <Pie options={options} data={chartData} />
}
