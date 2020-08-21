import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { renderComp } from '../../setupTests'
import SearchView from '../SearchView'

test('SearchView', () => {
  const navigation = { navigate: jest.fn() }
  const { getByTestId } = renderComp(
    <SearchView navigation={navigation} route="foo" />
  )

  expect(getByTestId('open-dialog')).not.toBeNull()
  fireEvent.press(getByTestId('open-dialog'))

  expect(getByTestId('cancel-dialog')).not.toBeNull()
  fireEvent.press(getByTestId('cancel-dialog'))

  expect(getByTestId('clear-fields')).not.toBeNull()
  fireEvent.press(getByTestId('clear-fields'))

  expect(getByTestId('do-query')).not.toBeNull()
  fireEvent.press(getByTestId('do-query'))

  expect(getByTestId('close-subject')).not.toBeNull()
  fireEvent.press(getByTestId('close-subject'))
  expect(getByTestId('set-subject')).not.toBeNull()
  fireEvent.changeText(getByTestId('set-subject'), 'foo')

  expect(getByTestId('close-to')).not.toBeNull()
  fireEvent.press(getByTestId('close-to'), 'foo')
  expect(getByTestId('set-to')).not.toBeNull()
  fireEvent.changeText(getByTestId('set-to'), 'foo')

  expect(getByTestId('close-from')).not.toBeNull()
  fireEvent.press(getByTestId('close-from'), 'foo')
  expect(getByTestId('set-from')).not.toBeNull()
  fireEvent.changeText(getByTestId('set-from'), 'foo')

  expect(getByTestId('close-sent')).not.toBeNull()
  fireEvent.press(getByTestId('close-sent'), 'foo')
  expect(getByTestId('set-sent')).not.toBeNull()
  fireEvent.changeText(getByTestId('set-sent'), 'foo')

  expect(getByTestId('close-all-text')).not.toBeNull()
  fireEvent.press(getByTestId('close-all-text'), 'foo')
  expect(getByTestId('set-all-text')).not.toBeNull()
  fireEvent.changeText(getByTestId('set-all-text'), 'foo')
})
