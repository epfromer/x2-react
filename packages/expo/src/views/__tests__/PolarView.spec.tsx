import React from 'react'
import { renderComp } from '../../setupTests'
import PolarView from '../PolarView'

test('PolarView ECharts Senders', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <PolarView navigation={navigation} route="foo" />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})

test('PolarView ECharts Receivers', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <PolarView navigation={navigation} route="foo" isSendersDef={false} />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})

test('PolarView Victory Senders', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <PolarView navigation={navigation} route="foo" chartLibDef="Victory" />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})

test('PolarView Victory Receivers', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <PolarView
      navigation={navigation}
      route="foo"
      chartLibDef="Victory"
      isSendersDef={false}
    />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})
