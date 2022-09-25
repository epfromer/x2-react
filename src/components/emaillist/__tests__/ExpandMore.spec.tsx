import { fireEvent } from '@testing-library/react'
import React from 'react'
import { renderComp } from '../../../setupTests'
import ExpandMore from '../ExpandMore'

test('onDateClose', async () => {
  const { getByTestId } = renderComp(<ExpandMore />)
  const button = getByTestId('expand-more-button')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
