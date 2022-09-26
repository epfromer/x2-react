import { fireEvent } from '@testing-library/react'
import { renderComp } from '../../../setupTests'
import PieVictory from '../PieVictory'

const data = [
  { name: 'Causey, Richard', value: 272, color: '#d1dc39' },
  { name: 'Fastow, Andrew', value: 34, color: '#e91e63' },
]

test('pie-victory', async () => {
  const onClick = jest.fn()
  const { getByTestId } = renderComp(
    <PieVictory title="foo" search="to" data={data} handleClick={onClick} />
  )
  const button = getByTestId('pie-victory')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
