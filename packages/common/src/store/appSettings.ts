import AsyncStorage from '@react-native-community/async-storage'
import { setDarkMode, setThemeName, store } from './index'

// TODO - get dark mode from OS
// do in expo, web and store in redux so don't include lib here

export async function loadAppSettingsAsync() {
  try {
    let darkMode = false
    let themeName = 'Purple'
    if (typeof Storage !== 'undefined') {
      if (localStorage.getItem('darkMode') === 'true') {
        darkMode = true
      }
      if (localStorage.getItem('themeName') !== 'null') {
        themeName = localStorage.getItem('themeName')
      }
    } else {
      let value = await AsyncStorage.getItem('darkMode')
      if (value === 'true') darkMode = true
      value = await AsyncStorage.getItem('themeName')
      if (value) themeName = value
    }
    store.dispatch(setDarkMode(darkMode))
    store.dispatch(setThemeName(themeName))
  } catch (e) {
    console.error(e)
  }
}

export async function setDarkModeAsync(darkMode: boolean) {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem('darkMode', String(darkMode))
  } else {
    await AsyncStorage.setItem('darkMode', String(darkMode))
  }
  store.dispatch(setDarkMode(darkMode))
}

export async function setThemeNameAsync(themeName: string) {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem('themeName', themeName)
  } else {
    await AsyncStorage.setItem('themeName', themeName)
  }
  store.dispatch(setThemeName(themeName))
}
