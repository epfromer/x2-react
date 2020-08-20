import React from 'react'
import { renderComp } from '../../setupTests'
import BarView from '../BarView'

test('BarView ECharts Senders', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <BarView navigation={navigation} route="foo" />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})

test('BarView ECharts Receivers', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <BarView navigation={navigation} route="foo" isSendersDef={false} />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})

test('BarView Victory Senders', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <BarView navigation={navigation} route="foo" chartLibDef="Victory" />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})

test('BarView Victory Receivers', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <BarView
      navigation={navigation}
      route="foo"
      chartLibDef="Victory"
      isSendersDef={false}
    />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})

test('BarView Highcharts Senders', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <BarView navigation={navigation} route="foo" chartLibDef="Highcharts" />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})

test('BarView Highcharts Receivers', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <BarView
      navigation={navigation}
      route="foo"
      chartLibDef="Highcharts"
      isSendersDef={false}
    />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})
