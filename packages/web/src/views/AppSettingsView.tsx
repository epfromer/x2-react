import Typography from '@material-ui/core/Typography'
import React from 'react'
import CustodianSettings from '../components/CustodianSettings'
import ImportLog from '../components/ImportLog'

export default function AppSettingsView() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <CustodianSettings />
      <ImportLog />
    </div>
  )
}
