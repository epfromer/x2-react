import { fireEvent } from '@testing-library/react-native'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import AppTopToolbar from '../RouteSwitch'

test('RouteSwitch', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<AppTopToolbar />, history)

  await fireEvent.press(getByTestId('app-settings'))
  expect(history.location.pathname).toMatch('/')
})
