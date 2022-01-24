import { useAuth0 } from '@auth0/auth0-react'
import { ExitToApp, Settings } from '@mui/icons-material'
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SettingsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const navigate = useNavigate()
  const { user } = useAuth0<{ name: string; picture: string }>()
  const { logout } = useAuth0()

  const handleClick = (event: any) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const signOut = () => {
    handleClose()
    logout({ returnTo: window.location.origin })
  }

  const navTo = (loc: string) => {
    handleClose()
    navigate(loc)
  }

  return (
    <div>
      <Tooltip title="Settings" aria-label="Settings">
        <IconButton
          aria-controls="customized-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
        >
          <Avatar data-testid="gravatar" src={user?.picture} />
        </IconButton>
      </Tooltip>
      <Menu
        elevation={10}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemText primary={user?.name} />
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navTo('/AppSettingsView')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <MenuItem onClick={signOut} data-testid="sign-out">
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </MenuItem>
      </Menu>
    </div>
  )
}
