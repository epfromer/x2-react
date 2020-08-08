import { fireEvent } from '@testing-library/react'
import React from 'react'
import { renderComp } from '../../setupTests'
import AppSettingsView from '../AppSettingsView'

test('set primary color', async () => {
  const { getByText } = renderComp(<AppSettingsView />)
  const button = getByText('saveSetting')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
