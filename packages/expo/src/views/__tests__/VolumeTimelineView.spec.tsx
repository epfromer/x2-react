import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { renderComp } from '../../setupTests'
import VolumeTimelineView from '../VolumeTimelineView'

test('VolumeTimelineView', async () => {
  const { getByTestId } = renderComp(<VolumeTimelineView />)

  const chartLibPicker = getByTestId('chartlib-picker')
  expect(chartLibPicker).not.toBeNull()

  // TODO - remove when Highcharts react native issues fixed
  // await fireEvent(chartLibPicker, 'valueChange', 'Highcharts')
  await fireEvent(chartLibPicker, 'valueChange', 'Victory')
})
