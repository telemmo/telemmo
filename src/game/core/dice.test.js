import {
  mergeWith,
  add,
} from 'ramda'

import { roll, rollMany, rollBatch } from './dice'

test('roll', () => {
  return roll(20)
    .then((result) => expect(result).toBeLessThan(21))
})

test('rollMany', () => {
  const amount = 100000
  return rollMany(20, amount)
    .then((results) => {
      console.log(results.reduce((total, roll) => {
        return mergeWith(add, total, { [roll]: 1 })
      },{}))

      expect(results.length).toBe(amount)

      results.forEach(result => {
        expect(result).toBeLessThanOrEqual(20)
        expect(result).toBeGreaterThanOrEqual(1)
      })

      const sum = results
        .reduce((average, current) => average + current)

      expect(sum/amount).toBeGreaterThan(9)
      expect(sum/amount).toBeLessThan(11)
    })
})

test('rollBatch', () => {
  return rollBatch(20, ['a', 'b', 'c'])
    .then((results) => {
      expect(Object.keys(results).length).toBe(3)
      expect(results.a).toBeLessThanOrEqual(20)
      expect(results.b).toBeLessThanOrEqual(20)
      expect(results.c).toBeLessThanOrEqual(20)
      expect(results.a).toBeGreaterThanOrEqual(1)
      expect(results.b).toBeGreaterThanOrEqual(1)
      expect(results.c).toBeGreaterThanOrEqual(1)
    })
})
