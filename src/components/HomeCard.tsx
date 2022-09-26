import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface Props {
  image: any
  title: string
  description: string
  link: string
}
export default function HomeCard({ image, title, description, link }: Props) {
  const navigate = useNavigate()
  return (
    <Card>
      <CardActionArea onClick={() => navigate(link)}>
        <CardMedia sx={{ height: 340 }} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
