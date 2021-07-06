import { fireEvent } from '@testing-library/react-native'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import SearchHistoryView from '../SearchHistoryView'

test('SearchHistoryView', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<SearchHistoryView />, history)
  await fireEvent.press(getByTestId('clear-history'))
  expect(history.location.pathname).toMatch('/')
})

test('SearchHistoryView onSearchHistory', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<SearchHistoryView />, history)
  await fireEvent.press(getByTestId('test-click'))
  expect(history.location.pathname).toMatch('/')
})
