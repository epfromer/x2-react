import { fireEvent } from '@testing-library/react-native'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../../setupTests'
import AppTopToolbar from '../AppTopToolbar'

test('AppTopToolbar', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<AppTopToolbar />, history)

  await fireEvent.press(getByTestId('home-button'))
  expect(history.location.pathname).toMatch('/')
})
