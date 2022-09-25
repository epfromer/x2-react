import { fireEvent } from '@testing-library/react'
import React from 'react'
import { renderComp } from '../../../setupTests'
import TreeMapECharts from '../TreeMapECharts'

const data = [
  { name: 'Causey, Richard', value: 272, color: '#d1dc39' },
  { name: 'Fastow, Andrew', value: 34, color: '#e91e63' },
]

test('tree-map-echarts', async () => {
  const onClick = jest.fn()
  const { getByTestId } = renderComp(
    <TreeMapECharts title="foo" search="to" data={data} handleClick={onClick} />
  )
  const button = getByTestId('tree-map-echarts')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
