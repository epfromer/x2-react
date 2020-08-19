import { fireEvent } from '@testing-library/react'
import React from 'react'
import { renderComp } from '../../setupTests'
import ContactSettings from '../ContactSettings'

test('handleClick', async () => {
  const { getByTestId } = renderComp(<ContactSettings />)
  const row = getByTestId('5f1301b1ab4d2f1a58ee5999')
  await fireEvent.click(row)
  const button = getByTestId('handle-click')
  await fireEvent.click(button)
})
