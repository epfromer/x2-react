import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import NetworkGraphView from '../../../packages/web/src/views/NetworkGraphView'

test('handleClickNetworkGraph', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<NetworkGraphView />, history)
  const button = getByTestId('handle-click')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/SearchView')
})
