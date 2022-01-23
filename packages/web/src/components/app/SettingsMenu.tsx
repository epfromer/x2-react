import { useAuth0 } from '@auth0/auth0-react'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Settings from '@material-ui/icons/Settings'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem)

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
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText primary={user?.name} />
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem onClick={() => navTo('/AppSettingsView')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </StyledMenuItem>
        <StyledMenuItem onClick={signOut} data-testid="sign-out">
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </StyledMenuItem>
      </Menu>
    </div>
  )
}
