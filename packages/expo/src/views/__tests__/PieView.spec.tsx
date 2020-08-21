import React from 'react'
import { renderComp } from '../../setupTests'
import PieView from '../PieView'

test('PieView ECharts Senders', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <PieView navigation={navigation} route="foo" />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})

test('PieView ECharts Receivers', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <PieView navigation={navigation} route="foo" isSendersDef={false} />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})

test('PieView Victory Senders', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <PieView navigation={navigation} route="foo" chartLibDef="Victory" />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})

test('PieView Victory Receivers', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <PieView
      navigation={navigation}
      route="foo"
      chartLibDef="Victory"
      isSendersDef={false}
    />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})

test('PieView Highcharts Senders', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <PieView navigation={navigation} route="foo" chartLibDef="Highcharts" />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})

test('PieView Highcharts Receivers', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <PieView
      navigation={navigation}
      route="foo"
      chartLibDef="Highcharts"
      isSendersDef={false}
    />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})
