import Typography from '@material-ui/core/Typography'
import React from 'react'
import ContactSettings from '../components/ContactSettings'

export default function AppSettingsView() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <ContactSettings />
      <button hidden data-testid="save-setting"></button>
    </div>
  )
}