import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContactSettings from '../components/ContactSettings'
import PrimaryColorPicker from '../components/PrimaryColorPicker'
import { RootState } from './../store/types'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0px',
  },
  colorGrid: {
    marginBottom: '15px',
  },
  control: {
    marginBottom: '15px',
  },
}))

export default function AppSettingsView() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )
  const themeSecondaryColor = useSelector(
    (state: RootState) => state.themeSecondaryColor
  )

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
        Interface element colors
      </Typography>
      <div className={classes.colorGrid}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Primary
            </Typography>
            <PrimaryColorPicker
              defaultColor={themePrimaryColor}
              onChange={(color: string) =>
                saveSetting('themePrimaryColor', color)
              }
              data-testid="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Secondary
            </Typography>
            <PrimaryColorPicker
              defaultColor={themeSecondaryColor}
              onChange={(color: string) =>
                saveSetting('themeSecondaryColor', color)
              }
            />
          </Grid>
        </Grid>
      </div>
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
