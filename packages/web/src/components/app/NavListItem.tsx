import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import { useHistory } from 'react-router-dom'

interface Props {
  icon: JSX.Element
  name: string
  route: string
}

export default function NavListItem({ icon, name, route }: Props) {
  const history = useHistory()

  return (
    <ListItem button onClick={() => history.push(route)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  )
}
