import { useAuth0 } from '@auth0/auth0-react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import BuildIcon from '@material-ui/icons/Build'
import React from 'react'
import SettingsMenu from './SettingsMenu'

export default function SettingsButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  return isAuthenticated ? (
    <SettingsMenu />
  ) : (
    <Tooltip title="Settings" aria-label="Settings">
      <IconButton color="inherit" onClick={() => loginWithRedirect()}>
        <BuildIcon />
      </IconButton>
    </Tooltip>
  )
}
