import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { renderComp } from '../../setupTests'
import AppSettingsView from '../AppSettingsView'

test('AppSettingsView', async () => {
  const { getByTestId } = renderComp(<AppSettingsView />)
  const custodian = getByTestId('fastow')
  fireEvent.press(custodian)
  expect(custodian).not.toBeNull()
})
