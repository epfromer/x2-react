import AsyncStorage from '@react-native-community/async-storage'
import { setDarkMode, store } from './index'

// TODO - get dark mode from OS
// do in expo, web and store in redux so don't include lib here

export async function loadAppSettingsAsync() {
  try {
    let darkMode = false
    if (typeof Storage !== 'undefined') {
      darkMode = localStorage.getItem('darkMode') === 'true' ? true : false
    } else {
      let value = await AsyncStorage.getItem('darkMode')
      if (value !== null) {
        darkMode = value === 'true' ? true : false
      }
    }
    store.dispatch(setDarkMode(darkMode))
  } catch (e) {
    console.error(e)
  }
}
