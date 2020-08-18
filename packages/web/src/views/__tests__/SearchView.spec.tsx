import React from 'react'
import { renderComp } from '../../setupTests'
import SearchView from '../SearchView'

test('find search-results-table', async () => {
  const { getByTestId } = renderComp(<SearchView />)
  const button = getByTestId('search-results-table')
  expect(button).toBeInTheDocument()
})
