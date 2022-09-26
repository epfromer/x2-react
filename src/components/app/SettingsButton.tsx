import { useAuth0 } from '@auth0/auth0-react'
import { Build } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import SettingsMenu from './SettingsMenu'

export default function SettingsButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  return isAuthenticated ? (
    <SettingsMenu />
  ) : (
    <Tooltip title="Settings" aria-label="Settings">
      <IconButton
        color="inherit"
        onClick={async () =>
          await loginWithRedirect({
            redirectUri: window.location.origin + '/AppSettingsView',
          })
        }
      >
        <Build />
      </IconButton>
    </Tooltip>
  )
}
