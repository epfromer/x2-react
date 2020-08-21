import React from 'react'
import { renderComp } from '../../setupTests'
import NetworkGraphView from '../NetworkGraphView'

test('NetworkGraphView', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <NetworkGraphView navigation={navigation} route="foo" />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})
