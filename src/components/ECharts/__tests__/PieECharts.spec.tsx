import { fireEvent } from '@testing-library/react'
import { renderComp } from '../../../setupTests'
import PieECharts from '../PieECharts'

const data = [
  { name: 'Causey, Richard', value: 272, color: '#d1dc39' },
  { name: 'Fastow, Andrew', value: 34, color: '#e91e63' },
]

test('pie-echarts', async () => {
  const onClick = jest.fn()
  const { getByTestId } = renderComp(
    <PieECharts title="foo" search="to" data={data} handleClick={onClick} />
  )
  const button = getByTestId('pie-echarts')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
