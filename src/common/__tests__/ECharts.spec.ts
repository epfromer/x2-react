import {
  EmailSentByDay,
  EmailXferedDatum,
  getBarEChartsConfig,
  getNetworkGraphEChartsConfig,
  getPieEChartsConfig,
  getTreeMapEChartsConfig,
  getVolumeTimelineEChartsConfig,
} from '../index'

const emailXfered: Array<EmailXferedDatum> = [
  { name: 'a', value: 1, color: 'red' },
  { name: 'b', value: 2, color: 'blue' },
]
const networkData: Array<[string, string, number]> = [
  ['Causey, Richard', 'Whalley, Greg', 1],
  ['Causey, Richard', 'Glisan, Ben', 1],
  ['Fastow, Andrew', 'Whalley, Greg', 1],
  ['Fastow, Andrew', 'Lay, Kenneth', 1],
  ['Glisan, Ben', 'Whalley, Greg', 1],
  ['Glisan, Ben', 'Causey, Richard', 1],
  ['Skilling, Jeff', 'Lay, Kenneth', 4],
]
const networkNodes = [
  { id: 'Causey, Richard', color: '#fcff00', emailTotal: 3 },
  { id: 'Fastow, Andrew', color: '#e91e63', emailTotal: 2 },
  { id: 'Glisan, Ben', color: '#595fa1', emailTotal: 3 },
  { id: 'Lay, Kenneth', color: '#ff9800', emailTotal: 5 },
  { id: 'Skilling, Jeff', color: '#009688', emailTotal: 4 },
  { id: 'Whalley, Greg', color: '#6dff4d', emailTotal: 3 },
]

const emailSentData: Array<EmailSentByDay> = [
  { sent: new Date('01/01/2000'), total: 1 },
  { sent: new Date('01/02/2000'), total: 1 },
]

test('getBarEChartsConfig', () => {
  expect(getBarEChartsConfig('black', 'foo', emailXfered, {})).toBeTruthy()
})

test('getNetworkGraphEChartsConfig', () => {
  expect(
    getNetworkGraphEChartsConfig('black', 'foo', networkData, networkNodes)
  ).toBeTruthy()
})

test('getPieEChartsConfig', () => {
  expect(getPieEChartsConfig('black', 'foo', emailXfered)).toBeTruthy()
})

test('getTreeMapEChartsConfig', () => {
  expect(getTreeMapEChartsConfig('black', 'foo', emailXfered)).toBeTruthy()
})

test('getVolumeTimelineEChartsConfig', () => {
  expect(
    getVolumeTimelineEChartsConfig('black', 'foo', emailSentData)
  ).toBeTruthy()
})
