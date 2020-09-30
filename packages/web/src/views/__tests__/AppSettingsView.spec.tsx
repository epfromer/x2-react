import React from 'react'
import { renderComp } from '../../setupTests'
import AppSettingsView from '../AppSettingsView'

test('AppSettingsView', async () => {
  const { getByText } = renderComp(<AppSettingsView />)
  const title = getByText(/Settings/i)
  expect(title).toBeInTheDocument()
})
