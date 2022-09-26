import { fireEvent } from '@testing-library/react'
import { renderComp } from '../../../setupTests'
import BarVictory from '../BarVictory'

const data = [
  { name: 'Causey, Richard', value: 272, color: '#d1dc39' },
  { name: 'Fastow, Andrew', value: 34, color: '#e91e63' },
]

test('bar-victory', async () => {
  const onClick = jest.fn()
  const { getByTestId } = renderComp(
    <BarVictory title="foo" search="to" data={data} handleClick={onClick} />
  )
  const button = getByTestId('bar-victory')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
