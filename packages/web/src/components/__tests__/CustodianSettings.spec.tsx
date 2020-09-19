import { fireEvent } from '@testing-library/react'
import React from 'react'
import { renderComp } from '../../setupTests'
import CustodianSettings from '../CustodianSettings'

test('handleClick', async () => {
  const { getByTestId } = renderComp(<CustodianSettings />)
  const row = getByTestId('fastow')
  await fireEvent.click(row)
  const button = getByTestId('handle-click')
  await fireEvent.click(button)
})
