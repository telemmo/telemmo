import {
  statUpgradeCost,
  statDowngradeRefund,
  totalStatPoints,
  totalStatPointsSpent,
  statPointsSpent,
} from './statHelpers'

const charMock = {
  str: 5,
  con: 9,
  ref: 16,
  acc: 45,
  flow: 90,
  level: 100,
}

test('get upgrade cost', () => {
  expect(statUpgradeCost(charMock.str)).toBe(5)
  expect(statUpgradeCost(charMock.con)).toBe(10)
  expect(statUpgradeCost(charMock.ref)).toBe(15)
  expect(statUpgradeCost(charMock.acc)).toBe(30)
  expect(statUpgradeCost(charMock.flow)).toBe(60)
  expect(statUpgradeCost(20, 6)).toBe(100)
  expect(statUpgradeCost(15, 10)).toBe(150)
})

test('get downgrade refund', () => {
  expect(statDowngradeRefund(charMock.str)).toBe(0)
  expect(statDowngradeRefund(charMock.con)).toBe(10)
  expect(statDowngradeRefund(charMock.ref)).toBe(10)
  expect(statDowngradeRefund(charMock.acc)).toBe(30)
  expect(statDowngradeRefund(charMock.flow)).toBe(60)
  expect(statDowngradeRefund(26, 6)).toBe(100)
  expect(statDowngradeRefund(25, 10)).toBe(150)
})

test('get total statPoints', () => {
  expect(totalStatPoints(6)).toBe(111)
})

test('get total spent for all stats', () => {
  expect(totalStatPointsSpent({ str: 6, con: 5, ref: 5, acc: 5, flow: 5 })).toBe(5)
  expect(totalStatPointsSpent({ str: 6, con: 5, ref: 6, acc: 5, flow: 5 })).toBe(10)
  expect(totalStatPointsSpent({ str: 10, con: 5, ref: 6, acc: 5, flow: 5 })).toBe(40)
})

test('get total spent for one stat', () => {
  expect(statPointsSpent(charMock.str)).toBe(0)
  expect(statPointsSpent(charMock.con)).toBe(25)
})

