import { fireEvent } from '@testing-library/react'
import fetch from 'jest-fetch-mock'
import React from 'react'
import { renderComp } from '../../setupTests'
import { store } from '../../store/mockStore'
import SearchView from '../SearchView'

jest.mock('lodash/debounce', () => jest.fn((fn) => fn))
require('jest-fetch-mock').enableMocks()

const resp = {
  emails: store.emails,
  total: store.totalEmails,
}
fetch.mockResponse(JSON.stringify(resp))

test('find search-results-table', async () => {
  const { getByTestId } = renderComp(<SearchView />)
  const button = getByTestId('search-results-table')
  expect(button).toBeInTheDocument()
})

test('date picker', async () => {
  const { getByTestId } = renderComp(<SearchView />)
  await fireEvent.click(getByTestId('open-date-picker'))
  await fireEvent.click(getByTestId('clear-date-picker'))
  await fireEvent.click(getByTestId('ok-date-picker'))
  expect(fetch.mock.calls.length).toEqual(1)
})

test('all text', async () => {
  const { getByTestId } = renderComp(<SearchView />)
  const inp = getByTestId('all-text').querySelector('input')
  inp && (await fireEvent.change(inp, { target: { value: 'foo' } }))
  expect(fetch.mock.calls.length).toEqual(1)
})

test('to sort', async () => {
  const { getByTestId } = renderComp(<SearchView />)
  await fireEvent.click(getByTestId('to-sort'))
  expect(fetch.mock.calls.length).toEqual(1)
})

test('expand more button', async () => {
  const { getAllByTestId } = renderComp(<SearchView />)
  const btns = getAllByTestId('expand-more-button')
  await fireEvent.click(btns[0])
  expect(btns[0]).toBeInTheDocument()
})
