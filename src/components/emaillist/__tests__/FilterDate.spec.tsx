import { fireEvent } from '@testing-library/react'
import { renderComp } from '../../../setupTests'
import FilterDate from '../FilterDateDlg'

test('ok-date-picker', async () => {
  const onClose = jest.fn()
  const onClear = jest.fn()
  const { getByTestId } = renderComp(
    <FilterDate
      date=""
      onClose={onClose}
      onClear={onClear}
      span={0}
      open={true}
    />
  )
  const button = getByTestId('ok-date-picker')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
