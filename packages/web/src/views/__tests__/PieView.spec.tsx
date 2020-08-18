import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import PieView from '../PieView'

test('renders', async () => {
  const history = createMemoryHistory()
  const { getByText } = renderComp(<PieView />, history)
  const button = getByText(/handleClick/i)
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/SearchView')
})
