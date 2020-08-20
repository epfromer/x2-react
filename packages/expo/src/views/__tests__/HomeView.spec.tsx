import { store } from '@klonzo/common'
import React from 'react'
import HomeView from '../HomeView'
import { render } from '@testing-library/react-native'
import { Provider } from 'react-redux'

test('HomeView', () => {
  const { getByText } = render(
    <Provider store={store}>
      <HomeView navigation={{}} />
    </Provider>
  )
  const button = getByText(/Pie chart/i)
  expect(button).not.toBeNull()
})
