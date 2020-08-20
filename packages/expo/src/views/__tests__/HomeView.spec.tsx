import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { renderComp } from '../../setupTests';
import HomeView from '../HomeView';

test('HomeView', () => {
  const { getByText } = renderComp(<HomeView navigation={{}} />)
  const card = getByText(/Pie chart/i)
  expect(card).not.toBeNull()
  // fireEvent.press(card)
})
