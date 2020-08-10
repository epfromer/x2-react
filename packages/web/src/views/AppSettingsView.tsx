import Typography from '@material-ui/core/Typography'
import { saveAppSettings, setReduxState } from '@klonzo/shared'
import React from 'react'
import ContactSettings from '../components/ContactSettings'

export default function AppSettingsView() {
  const saveSetting = (setting: string, value: string | number | boolean) => {
    setReduxState(setting, value)
    saveAppSettings()
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="h5" gutterBottom>
        Enron Key Contacts
      </Typography>
      <ContactSettings />
      <button hidden onClick={() => saveSetting('themeSecondaryColor', 'foo')}>
        saveSetting
      </button>
    </div>
  )
}
