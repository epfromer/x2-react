import { fireEvent } from '@testing-library/react-native'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import TreeMapView from '../TreeMapView'

test('TreeMapView', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<TreeMapView />, history)

  const xmitPicker = getByTestId('xmit-picker')
  expect(xmitPicker).not.toBeNull()
  const chartLibPicker = getByTestId('chartlib-picker')
  expect(chartLibPicker).not.toBeNull()
  await fireEvent(xmitPicker, 'valueChange', 'Receivers')

  await fireEvent.press(getByTestId('test-click'))
  expect(history.location.pathname).toMatch('/SearchView')
})
