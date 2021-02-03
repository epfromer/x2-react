import React from 'react'
import { renderComp } from '../../setupTests'
import ColorPickerDlg from '../ColorPickerDlg'

test('renders', async () => {
  const onClose = jest.fn()
  const { getByTestId } = renderComp(
    <ColorPickerDlg open={true} onClose={onClose} defaultColor={'pink'} />
  )
  expect(getByTestId('purple')).toBeInTheDocument()
})
