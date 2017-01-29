import {
  times,
  partial,
  filter,
  length,
} from 'ramda'

import Promise from 'bluebird'

import models from '../models'

function exploreMock (allStats, stance, monster) {
  return [
    [{
      name: 'Worms',
      level: 1,
      stance: 'arcane',
      flow: allStats,
      str: allStats,
      ref: allStats,
      acc: allStats,
      con: allStats,
    }],
    [models.monsters.find(monster)],
  ]
}

function runCombat (teams) {
  const { run } = require('./combat')
  return run(teams)
    .tap(({ turns, finishedAt, winner }) => {
      expect(finishedAt).toBeTruthy()
      expect(winner).toBeTruthy()
      // expect(turns.length).toBeLessThan(30)
    })
}

test('combat', () => {
  const teams = (exploreMock(100, 'arcane', 'death'))
  return runCombat(teams)
    // .tap(c => console.log(JSON.stringify(c, null, 2)))
});

function runCombatBatch (teams, amount, log) {
  return Promise.all(times(partial(runCombat, [teams]), amount))
    .tap((combats) => {
      expect(combats.length).toBe(amount)
    })
    .then(filter((result) => result.winner === 'Worms'))
    .then(length)
    .tap(console.log.bind(console, log))
}

// test('combatBalance', () => {
//   return Promise.all([
//     // runCombatBatch(exploreMock(100, 'arcane', 'death'), 100, 'arcane'),
//     // runCombatBatch(exploreMock(100, 'debuff', 'death'), 100, 'debuff'),
//     // runCombatBatch(exploreMock(100, 'endure', 'death'), 100, 'endure'),
//     // runCombatBatch(exploreMock(100, 'berserk', 'death'), 100, 'berserk'),
//     // runCombatBatch(exploreMock(100, 'poison', 'death'), 100, 'poison'),
//     // runCombatBatch(exploreMock(100, 'stealth', 'death'), 100, 'stealth'),
//     // runCombatBatch(exploreMock(100, 'martial', 'death'), 100, 'martial'),
//     // runCombatBatch(exploreMock(100, 'buffer', 'death'), 100, 'buffer'),
//     // runCombatBatch(exploreMock(100, 'sniper', 'death'), 100, 'sniper'),
//     // runCombatBatch(exploreMock(100, 'trapper', 'death'), 100, 'trapper'),
//     // runCombatBatch(exploreMock(100, 'support', 'death'), 100, 'support'),
//     // runCombatBatch(exploreMock(100, 'breaker', 'death'), 100, 'breaker'),
//     // runCombatBatch(exploreMock(5, 'arcane', 'snake'), 100, 'arcane'),
//     // runCombatBatch(exploreMock(5, 'debuff', 'snake'), 100, 'debuff'),
//     // runCombatBatch(exploreMock(5, 'endure', 'snake'), 100, 'endure'),
//     // runCombatBatch(exploreMock(5, 'berserk', 'snake'), 100, 'berserk'),
//     // runCombatBatch(exploreMock(5, 'poison', 'snake'), 100, 'poison'),
//     // runCombatBatch(exploreMock(5, 'stealth', 'snake'), 100, 'stealth'),
//     // runCombatBatch(exploreMock(5, 'martial', 'snake'), 100, 'martial'),
//     // runCombatBatch(exploreMock(5, 'buffer', 'snake'), 100, 'buffer'),
//     // runCombatBatch(exploreMock(5, 'sniper', 'snake'), 100, 'sniper'),
//     // runCombatBatch(exploreMock(5, 'trapper', 'snake'), 100, 'trapper'),
//     // runCombatBatch(exploreMock(5, 'support', 'snake'), 100, 'support'),
//     // runCombatBatch(exploreMock(5, 'breaker', 'snake'), 100, 'breaker'),
//   ])
// })


