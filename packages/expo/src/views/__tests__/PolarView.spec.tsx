import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { renderComp } from '../../setupTests'
import PolarView from '../PolarView'

test('PolarView', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <PolarView navigation={navigation} route="foo" />
  )

  const xmitPicker = getByTestId('xmit-picker')
  expect(xmitPicker).not.toBeNull()
  const chartLibPicker = getByTestId('chartlib-picker')
  expect(chartLibPicker).not.toBeNull()

  fireEvent(chartLibPicker, 'valueChange', 'Highcharts')
  fireEvent(chartLibPicker, 'valueChange', 'Victory')

  fireEvent(xmitPicker, 'valueChange', 'Receivers')
  fireEvent(chartLibPicker, 'valueChange', 'ECharts')
  fireEvent(chartLibPicker, 'valueChange', 'Highcharts')
  fireEvent(chartLibPicker, 'valueChange', 'Victory')
})
