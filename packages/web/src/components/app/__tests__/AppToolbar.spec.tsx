import { fireEvent } from '@testing-library/react'
import React from 'react'
import { renderComp } from '../../../setupTests'
import AppToolbar from '../AppToolbar'

test('renders', async () => {
  const setDrawerOpen = jest.fn()
  const { getByTestId } = renderComp(
    <AppToolbar setDrawerOpen={setDrawerOpen} drawerOpen={true} />
  )
  let button = getByTestId('open-drawer')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
  button = getByTestId('dark-mode')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
