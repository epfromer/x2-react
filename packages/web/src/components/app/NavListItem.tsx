import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  icon: JSX.Element
  name: string
  route: string
}

export default function NavListItem({ icon, name, route }: Props) {
  const navigate = useNavigate()

  return (
    <ListItem button onClick={() => navigate(route)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  )
}
