import { fireEvent } from '@testing-library/react'
import React from 'react'
import { renderComp } from '../../setupTests'
import EventTimelineView from '../EventTimelineView'

test('toggle vertical', async () => {
  const { getByTestId } = renderComp(<EventTimelineView />)
  const button = getByTestId('toggle-vertical')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
