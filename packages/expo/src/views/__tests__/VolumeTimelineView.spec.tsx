import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { renderComp } from '../../setupTests'
import VolumeTimelineView from '../VolumeTimelineView'

test('VolumeTimelineView', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <VolumeTimelineView navigation={navigation} route="foo" />
  )

  const chartLibPicker = getByTestId('chartlib-picker')
  expect(chartLibPicker).not.toBeNull()

  fireEvent(chartLibPicker, 'valueChange', 'Highcharts')
  fireEvent(chartLibPicker, 'valueChange', 'Victory')
})
