import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import ChordView from '../ChordView'

test('handleClick', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<ChordView />, history)
  const button = getByTestId('handle-click')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/SearchView')
})
