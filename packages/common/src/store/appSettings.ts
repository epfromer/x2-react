import AsyncStorage from '@react-native-community/async-storage'
import { setDarkMode, setThemeName, store } from './index'

// TODO - get dark mode from OS
// do in expo, web and store in redux so don't include lib here

export async function loadAppSettingsAsync() {
  try {
    let darkMode = false
    let themeName
    if (typeof Storage !== 'undefined') {
      darkMode = localStorage.getItem('darkMode') === 'true' ? true : false
      themeName = localStorage.getItem('themeName')
    } else {
      let value = await AsyncStorage.getItem('darkMode')
      darkMode = value === 'true' ? true : false
      value = await AsyncStorage.getItem('themeName')
      themeName = value ? value : 'Purple'
    }
    store.dispatch(setDarkMode(darkMode))
    store.dispatch(setThemeName(themeName))
  } catch (e) {
    console.error(e)
  }
}
