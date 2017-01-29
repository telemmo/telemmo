import { level } from './level'

test('levels', () => {
  expect(level({ exp: 0 })).toBe(0)
  expect(level({ exp: 23 })).toBe(0)
  expect(level({ exp: 24 })).toBe(1)
  expect(level({ exp: 100 })).toBe(1)
  expect(level({ exp: 200 })).toBe(2)
  expect(level({ exp: 1000 })).toBe(3)
  expect(level({ exp: 5000 })).toBe(6)
  expect(level({ exp: 10000 })).toBe(7)
  expect(level({ exp: 100000 })).toBe(16)
  expect(level({ exp: 1000000 })).toBe(35)
  expect(level({ exp: 10000000 })).toBe(75)
  expect(level({ exp: 50000000 })).toBe(100)
  expect(level({ exp: 100000000 })).toBe(100)
})

