import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { renderComp } from '../../setupTests'
import AppSettingsView from '../AppSettingsView'

test('AppSettingsView', async () => {
  const { getByTestId } = renderComp(<AppSettingsView />)
  const custodian = getByTestId('5f1301b1ab4d2f1a58ee5999')
  fireEvent.press(custodian)
  expect(custodian).not.toBeNull()
})
