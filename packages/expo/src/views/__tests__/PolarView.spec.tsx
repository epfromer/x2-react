import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { renderComp } from '../../setupTests'
import PolarView from '../PolarView'

test('PolarView', async () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <PolarView navigation={navigation} route="foo" />
  )

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
})
