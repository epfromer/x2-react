import React from 'react'
import { renderComp } from '../../setupTests'
import TreeMapView from '../TreeMapView'

test('TreeMapView ECharts Senders', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <TreeMapView navigation={navigation} route="foo" />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})

test('TreeMapView ECharts Receivers', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <TreeMapView navigation={navigation} route="foo" isSendersDef={false} />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})
