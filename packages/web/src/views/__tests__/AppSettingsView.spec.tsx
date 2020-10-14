import React from 'react'
import { renderComp } from '../../setupTests'
import AppSettingsView from '../AppSettingsView'

test('AppSettingsView', async () => {
  const { getByText } = renderComp(<AppSettingsView />)
  const title = getByText(/App Theme/i)
  expect(title).toBeInTheDocument()
})
