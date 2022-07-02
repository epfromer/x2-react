import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PieController,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

export default function ChartJSInit() {
  ChartJS.register(
    ArcElement,
    BarController,
    BarElement,
    CategoryScale,
    Legend,
    LineElement,
    LinearScale,
    PieController,
    PointElement,
    Title,
    Tooltip
  )
}
