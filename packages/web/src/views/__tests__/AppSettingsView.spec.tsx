import React from 'react'
import { renderComp } from '../../setupTests'
import AppSettingsView from '../AppSettingsView'

test('AppSettingsView', async () => {
  const { getByText } = renderComp(<AppSettingsView />)
  const title = getByText(/Import Log/i)
  expect(title).toBeInTheDocument()
})
