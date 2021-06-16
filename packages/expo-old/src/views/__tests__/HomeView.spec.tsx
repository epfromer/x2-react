import { fireEvent } from '@testing-library/react-native'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import HomeView from '../HomeView'

test('HomeView', async () => {
  const history = createMemoryHistory()
  const { getByText } = renderComp(<HomeView />, history)
  const card = getByText(/Pie chart/i)
  expect(card).not.toBeNull()
  await fireEvent.press(card)
  expect(history.location.pathname).toMatch('/PieView')
})
