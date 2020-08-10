import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import NetworkGraphView from '../NetworkGraphView'

test('toggle senders', async () => {
  const { getByTestId } = renderComp(<NetworkGraphView />)
  const button = getByTestId('toggle-senders')
  await fireEvent.click(button)
  expect(button).toHaveTextContent('Receivers')
})

test('toggle all', async () => {
  const { getByTestId } = renderComp(<NetworkGraphView />)
  const button = getByTestId('toggle-all')
  await fireEvent.click(button)
})

test('handleClickNetworkGraph', async () => {
  const history = createMemoryHistory()
  const { getByText } = renderComp(<NetworkGraphView />, {}, history)
  const button = getByText(/handleClickNetworkGraph/i)
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/SearchView')
})
