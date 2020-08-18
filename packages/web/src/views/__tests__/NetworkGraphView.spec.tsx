import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import NetworkGraphView from '../NetworkGraphView'

test('handleClickNetworkGraph', async () => {
  const history = createMemoryHistory()
  const { getByText } = renderComp(<NetworkGraphView />, history)
  const button = getByText(/handleClick/i)
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/SearchView')
})
