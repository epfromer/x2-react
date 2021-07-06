import { fireEvent } from '@testing-library/react-native'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import VolumeTimelineView from '../VolumeTimelineView'

test('VolumeTimelineView', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<VolumeTimelineView />, history)

  const chartLibPicker = getByTestId('chartlib-picker')
  expect(chartLibPicker).not.toBeNull()

  await fireEvent(chartLibPicker, 'valueChange', 'Highcharts')
  await fireEvent(chartLibPicker, 'valueChange', 'Victory')

  await fireEvent.press(getByTestId('test-click'))
  expect(history.location.pathname).toMatch('/SearchView')
})
