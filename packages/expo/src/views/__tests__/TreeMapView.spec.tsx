import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { renderComp } from '../../setupTests'
import TreeMapView from '../TreeMapView'

test('TreeMapView', async () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <TreeMapView navigation={navigation} route="foo" />
  )

  const xmitPicker = getByTestId('xmit-picker')
  expect(xmitPicker).not.toBeNull()
  const chartLibPicker = getByTestId('chartlib-picker')
  expect(chartLibPicker).not.toBeNull()
  await fireEvent(xmitPicker, 'valueChange', 'Receivers')
})
