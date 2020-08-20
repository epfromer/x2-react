// import { store } from '@klonzo/common'
// import React from 'react'
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'
// import { render } from '@testing-library/react-native'
// import { Provider } from 'react-redux'

// export function renderComp(comp) {
//   return render(<Provider store={store}>{comp}</Provider>)
// }

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)
