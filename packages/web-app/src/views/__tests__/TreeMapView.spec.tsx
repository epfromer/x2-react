import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import TreeMapView from '../TreeMapView'

test('renders', async () => {
  const history = createMemoryHistory()
  const { getByText } = renderComp(<TreeMapView />, {}, history)
  const button = getByText(/handleClickTreeMap/i)
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/SearchView')
})
