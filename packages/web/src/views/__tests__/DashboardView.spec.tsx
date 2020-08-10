import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import HomeView from '../HomeView'

test('renders', async () => {
  const history = createMemoryHistory()
  const { getByText } = renderComp(<HomeView />, {}, history)
  const button = getByText(/Chord diagram of Enron/i)
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/ChordView')
})
