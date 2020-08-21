// import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { renderComp } from '../../setupTests'
import SearchView from '../SearchView'

test('SearchView', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <SearchView navigation={navigation} route="foo" />
  )

  const btn = getByTestId('open-dialog')
  expect(btn).not.toBeNull()

  // const chartLibPicker = getByTestId('chartlib-picker')
  // expect(chartLibPicker).not.toBeNull()

  // fireEvent(chartLibPicker, 'valueChange', 'Highcharts')
  // fireEvent(chartLibPicker, 'valueChange', 'Victory')

  // fireEvent(xmitPicker, 'valueChange', 'Receivers')
  // fireEvent(chartLibPicker, 'valueChange', 'ECharts')
  // fireEvent(chartLibPicker, 'valueChange', 'Highcharts')
  // fireEvent(chartLibPicker, 'valueChange', 'Victory')
})
