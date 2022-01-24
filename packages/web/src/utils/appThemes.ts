import { PaletteMode } from '@mui/material'
import { brown, grey } from '@mui/material/colors'

// https://reactnativeelements.com/docs/button
// https://reactnativeelements.com/docs/header

export function getTheme(mode: PaletteMode) {
  const lightPalette = {
    // palette values for light mode
    primary: brown,
    divider: brown[200],
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
  }
  const darkPalette = {
    // palette values for dark mode
    primary: brown,
    divider: brown[700],
    background: {
      default: grey[900],
      paper: brown[900],
    },
    text: {
      primary: '#fff',
      secondary: grey[500],
    },
  }

  return {
    palette: {
      mode,
      ...(mode === 'light' ? lightPalette : darkPalette),
    },
  }
}
