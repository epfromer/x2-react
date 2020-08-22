import { getBarEChartsConfig, EmailXferedDatum } from '../index'

const emailXfered: Array<EmailXferedDatum> = [
  { name: 'a', value: 1, color: 'red' },
  { name: 'b', value: 2, color: 'blue' },
]

test('AppSettingsView', () => {
  expect(getBarEChartsConfig(true, 'foo', emailXfered, {})).toBeTruthy()
})
