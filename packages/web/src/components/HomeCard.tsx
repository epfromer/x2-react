import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  cardImage: {
    height: 340,
  },
}))

interface Props {
  image: any
  title: string
  description: string
  link: string
}
const HomeCard: React.FC<Props> = ({ image, title, description, link }) => {
  const classes = useStyles()
  const history = useHistory()

  const handleClick = (loc: string) => history.push(loc)

  return (
    <Card>
      <CardActionArea onClick={() => handleClick(link)}>
        <CardMedia className={classes.cardImage} image={image} title={title} />
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

export default HomeCard
