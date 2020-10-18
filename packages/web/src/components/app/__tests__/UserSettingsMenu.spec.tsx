import { fireEvent } from '@testing-library/react'
import React from 'react'
import { renderComp } from '../../../setupTests'
import SettingsMenu from '../SettingsMenu'

test('renders', async () => {
  const { getByTestId } = renderComp(<SettingsMenu />)
  let button = getByTestId('sign-out')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
