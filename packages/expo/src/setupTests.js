// mockAsyncStorage import must come before import of {store}
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'
import { store } from '@klonzo/common'
import { render } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'

export function renderComp(comp) {
  return render(<Provider store={store}>{comp}</Provider>)
}

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)
