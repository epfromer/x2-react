import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../../setupTests'
import AppTopToolbar from '../AppTopToolbar'

test('AppTopToolbar', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<AppTopToolbar />, history)

  expect(getByTestId('home-button')).not.toBeNull()
})
