import { fireEvent } from '@testing-library/react'
import React from 'react'
import { renderComp } from '../../../setupTests'
import VolumeTimelineVictory from '../VolumeTimelineVictory'

const data = [
  { sent: '1999-08-16', total: 9 },
  { sent: '1999-08-17', total: 2 },
  { sent: '1999-08-18', total: 3 },
  { sent: '1999-08-19', total: 3 },
]

test('volume-timeline-victory', async () => {
  const onClick = jest.fn()
  const { getByTestId } = renderComp(
    <VolumeTimelineVictory title="foo" data={data} handleClick={onClick} />
  )
  const button = getByTestId('volume-timeline-victory')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
