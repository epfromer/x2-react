import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
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
    <MenuItem onClick={() => navigate(route)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={name} />
    </MenuItem>
  )
}
