import { fireEvent } from '@testing-library/react'
import React from 'react'
import { renderComp } from '../../../setupTests'
import BarECharts from '../BarECharts'

const data = [
  { name: 'Causey, Richard', value: 272, color: '#d1dc39' },
  { name: 'Fastow, Andrew', value: 34, color: '#e91e63' },
]

test('bar-echarts', async () => {
  const onClick = jest.fn()
  const { getByTestId } = renderComp(
    <BarECharts title="foo" search="to" data={data} handleClick={onClick} />
  )
  const button = getByTestId('bar-echarts')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
