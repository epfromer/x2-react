import { fireEvent } from '@testing-library/react-native'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import AppSettingsView from '../AppSettingsView'

test('AppSettingsView', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<AppSettingsView />, history)
  const custodian = getByTestId('fastow')
  fireEvent.press(custodian)
  expect(custodian).not.toBeNull()
  fireEvent.press(getByTestId('sign-out'))
  expect(history.location.pathname).toMatch('/')
})
