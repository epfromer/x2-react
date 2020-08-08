import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch } from 'react-redux'
import ContactSettings from '../components/ContactSettings'

export default function AppSettingsView() {
  const dispatch = useDispatch()

  const saveSetting = (setting: string, value: string | number | boolean) => {
    dispatch({ type: 'setReduxState', key: setting, value: value })
    dispatch({ type: 'saveAppSettings' })
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
