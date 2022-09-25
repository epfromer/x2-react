import { fireEvent } from '@testing-library/react'
import React from 'react'
import { renderComp } from '../../setupTests'
import SearchView from '../../../packages/web/src/views/SearchView'

test('search-results-table', async () => {
  const { getByTestId } = renderComp(<SearchView />)
  const button = getByTestId('search-results-table')
  expect(button).toBeInTheDocument()
})

test('to-sort', async () => {
  const { getByTestId } = renderComp(<SearchView />)
  const button = getByTestId('to-sort')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})

test('open-date-picker', async () => {
  const { getByTestId } = renderComp(<SearchView />)
  const button = getByTestId('open-date-picker')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})

test('onDateClear', async () => {
  const { getByTestId } = renderComp(<SearchView />)
  const button = getByTestId('onDateClear')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})

test('onDateClose', async () => {
  const { getByTestId } = renderComp(<SearchView />)
  const button = getByTestId('onDateClose')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
