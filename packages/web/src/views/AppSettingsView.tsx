import Typography from '@material-ui/core/Typography'
import React from 'react'
import CustodianSettings from '../components/CustodianSettings'

export default function AppSettingsView() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <CustodianSettings />
      <button hidden data-testid="save-setting"></button>
    </div>
  )
}
