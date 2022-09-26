import { fireEvent } from '@testing-library/react'
import { renderComp } from '../../../setupTests'
import NetworkGraphECharts from '../NetworkGraphECharts'

const data: Array<[string, string, number]> = [
  ['Causey, Richard', 'Whalley, Greg', 1],
  ['Causey, Richard', 'Glisan, Ben', 1],
  ['Fastow, Andrew', 'Whalley, Greg', 1],
  ['Fastow, Andrew', 'Lay, Kenneth', 1],
  ['Glisan, Ben', 'Whalley, Greg', 1],
  ['Glisan, Ben', 'Causey, Richard', 1],
  ['Skilling, Jeff', 'Lay, Kenneth', 4],
]

const nodes = [
  { id: 'Causey, Richard', color: '#d1dc39', emailTotal: 3 },
  { id: 'Fastow, Andrew', color: '#e91e63', emailTotal: 2 },
  { id: 'Glisan, Ben', color: '#595fa1', emailTotal: 3 },
  { id: 'Lay, Kenneth', color: '#ff9800', emailTotal: 5 },
  { id: 'Skilling, Jeff', color: '#009688', emailTotal: 4 },
  { id: 'Whalley, Greg', color: '#7c4dff', emailTotal: 3 },
]

test('network-graph-echarts', async () => {
  const onClick = jest.fn()
  const { getByTestId } = renderComp(
    <NetworkGraphECharts
      title="foo"
      data={data}
      nodes={nodes}
      handleClick={onClick}
    />
  )
  const button = getByTestId('network-graph-echarts')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
