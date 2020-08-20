import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { renderComp } from '../../setupTests'
import HomeView from '../HomeView'

test('HomeView', () => {
  const navigation = { navigate: jest.fn() }
  const { getByText } = renderComp(<HomeView navigation={navigation} />)
  const card = getByText(/Pie chart/i)
  expect(card).not.toBeNull()
  fireEvent.press(card)
  expect(navigation.navigate).toHaveBeenCalledWith('PieView')
})
