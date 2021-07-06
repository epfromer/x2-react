import { fireEvent } from '@testing-library/react-native'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import SearchView from '../SearchView'

test('SearchView', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<SearchView />, history)

  expect(getByTestId('open-dialog')).not.toBeNull()
  await fireEvent.press(getByTestId('open-dialog'))

  expect(getByTestId('cancel-dialog')).not.toBeNull()
  await fireEvent.press(getByTestId('cancel-dialog'))

  expect(getByTestId('clear-fields')).not.toBeNull()
  await fireEvent.press(getByTestId('clear-fields'))

  expect(getByTestId('do-query')).not.toBeNull()
  await fireEvent.press(getByTestId('do-query'))

  expect(getByTestId('close-subject')).not.toBeNull()
  await fireEvent.press(getByTestId('close-subject'))
  expect(getByTestId('set-subject')).not.toBeNull()
  await fireEvent.changeText(getByTestId('set-subject'), 'foo')

  expect(getByTestId('close-to')).not.toBeNull()
  await fireEvent.press(getByTestId('close-to'))
  expect(getByTestId('set-to')).not.toBeNull()
  await fireEvent.changeText(getByTestId('set-to'), 'foo')

  expect(getByTestId('close-from')).not.toBeNull()
  await fireEvent.press(getByTestId('close-from'))
  expect(getByTestId('set-from')).not.toBeNull()
  await fireEvent.changeText(getByTestId('set-from'), 'foo')

  expect(getByTestId('close-sent')).not.toBeNull()
  await fireEvent.press(getByTestId('close-sent'))
  expect(getByTestId('set-sent')).not.toBeNull()
  await fireEvent.changeText(getByTestId('set-sent'), 'foo')

  expect(getByTestId('close-all-text')).not.toBeNull()
  await fireEvent.press(getByTestId('close-all-text'))
  expect(getByTestId('set-all-text')).not.toBeNull()
  await fireEvent.changeText(getByTestId('set-all-text'), 'foo')
})
