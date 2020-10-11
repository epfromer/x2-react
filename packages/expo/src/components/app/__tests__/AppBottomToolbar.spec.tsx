import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../../setupTests'
import AppBottomToolbar from '../AppBottomToolbar'

test('AppBottomToolbar', async () => {
  const history = createMemoryHistory()
  const { getByText } = renderComp(<AppBottomToolbar />, history)

  const chartLibPicker = getByText(/settings/i)
  expect(chartLibPicker).not.toBeNull()
})
