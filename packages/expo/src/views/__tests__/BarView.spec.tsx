import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { renderComp } from '../../setupTests'
import BarView from '../BarView'

test('BarView', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <BarView navigation={navigation} route="foo" />
  )
  const picker = getByTestId('xmittype')
  expect(picker).not.toBeNull()
})
