import {
  getStatCost,
  getStatSpent,
  getTotalStats,
  getSpent,
} from './statHelpers'

const charMock = {
  str: 5,
  con: 9,
  ref: 16,
  acc: 45,
  flow: 90,
  level: 100,
}

test('get cost', () => {
  expect(getStatCost(charMock, 'strength')).toBe(5)
  expect(getStatCost(charMock, 'constitution')).toBe(10)
  expect(getStatCost(charMock, 'reflex')).toBe(15)
  expect(getStatCost(charMock, 'accuracy')).toBe(30)
  expect(getStatCost(charMock, 'flow')).toBe(60)
})

test('get total statPoints', () => {
  expect(getTotalStats({ level: 6 })).toBe(111)
})

test('get total spent for all stats', () => {
  expect(getSpent({ str: 6, con: 5, ref: 5, acc: 5, flow: 5 })).toBe(5)
  expect(getSpent({ str: 6, con: 5, ref: 6, acc: 5, flow: 5 })).toBe(10)
  expect(getSpent({ str: 10, con: 5, ref: 6, acc: 5, flow: 5 })).toBe(40)
})


test('get total spent for one stat', () => {
  expect(getStatSpent(charMock, 'strength')).toBe(0)
  expect(getStatSpent(charMock, 'constitution')).toBe(25)
})

