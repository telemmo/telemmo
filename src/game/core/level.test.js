import { level, percentageToNextLevel, buildExpBar } from './level'

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

test('percentage to next level', () => {
  expect(percentageToNextLevel({ exp: 0 })).toBe(0)
  expect(percentageToNextLevel({ exp: 23 })).toBeGreaterThan(0.9)
  expect(percentageToNextLevel({ exp: 23 * Math.pow(4, 3) - 1 })).toBeGreaterThan(0.9)
  expect(percentageToNextLevel({ exp: 23 * Math.pow(8, 3) - 1 })).toBeGreaterThan(0.9)
  expect(percentageToNextLevel({ exp: 23 * Math.pow(20, 3) - 1 })).toBeGreaterThan(0.9)
  expect(percentageToNextLevel({ exp: 23 * Math.pow(50, 3) - 1 })).toBeGreaterThan(0.9)
  expect(percentageToNextLevel({ exp: 23 * Math.pow(99, 3) - 1 })).toBeGreaterThan(0.9)
  expect(percentageToNextLevel({ exp: 99999999999999 })).toBe(null)
})

test('buildExpBar', () => {
  expect(buildExpBar(0.9, 10)).toBe('90.00% |█████████ |')
  expect(buildExpBar(0.5, 10)).toBe('50.00% |█████     |')
  expect(buildExpBar(0.5)).toBe('50.00% |█████     |')
  expect(buildExpBar(0)).toBe('0.00% |          |')
  expect(buildExpBar(0.675)).toBe('67.50% |██████▊   |')
  expect(buildExpBar(0.25)).toBe('25.00% |██▌       |')
})

