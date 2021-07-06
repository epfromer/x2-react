import { fireEvent } from '@testing-library/react-native'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import NetworkGraphView from '../NetworkGraphView'

test('NetworkGraphView', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<NetworkGraphView />, history)
  const chartLibPicker = getByTestId('chartlib-picker')
  expect(chartLibPicker).not.toBeNull()

  await fireEvent.press(getByTestId('test-click'))
  expect(history.location.pathname).toMatch('/SearchView')
})
