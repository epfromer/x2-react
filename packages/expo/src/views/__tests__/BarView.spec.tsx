import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { renderComp } from '../../setupTests'
import BarView from '../BarView'

test('BarView', async () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <BarView navigation={navigation} route="foo" />
  )

  const xmitPicker = getByTestId('xmit-picker')
  expect(xmitPicker).not.toBeNull()
  const chartLibPicker = getByTestId('chartlib-picker')
  expect(chartLibPicker).not.toBeNull()

  // TODO - remove when Highcharts react native issues fixed
  // await fireEvent(chartLibPicker, 'valueChange', 'Highcharts')
  await fireEvent(chartLibPicker, 'valueChange', 'Victory')

  await fireEvent(xmitPicker, 'valueChange', 'Receivers')
  await fireEvent(chartLibPicker, 'valueChange', 'ECharts')
  // TODO - remove when Highcharts react native issues fixed
  // await fireEvent(chartLibPicker, 'valueChange', 'Highcharts')
  await fireEvent(chartLibPicker, 'valueChange', 'Victory')
})
