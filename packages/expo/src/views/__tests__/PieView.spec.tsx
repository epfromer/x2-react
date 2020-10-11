import { fireEvent } from '@testing-library/react-native'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import PieView from '../PieView'

test('PieView', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<PieView />, history)

  const xmitPicker = getByTestId('xmit-picker')
  expect(xmitPicker).not.toBeNull()
  const chartLibPicker = getByTestId('chartlib-picker')
  expect(chartLibPicker).not.toBeNull()

  await fireEvent(chartLibPicker, 'valueChange', 'Highcharts')
  await fireEvent(chartLibPicker, 'valueChange', 'Victory')

  await fireEvent(xmitPicker, 'valueChange', 'Receivers')
  await fireEvent(chartLibPicker, 'valueChange', 'ECharts')
  await fireEvent(chartLibPicker, 'valueChange', 'Highcharts')
  await fireEvent(chartLibPicker, 'valueChange', 'Victory')

  await fireEvent.press(getByTestId('test-click'))
  expect(history.location.pathname).toMatch('/SearchView')
})
