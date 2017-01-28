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

function runCombatBatch (teams, amount, allStats) {
  return Promise.all(times(partial(runCombat, [teams]), amount))
    .tap((combats) => {
      expect(combats.length).toBe(amount)
    })
    .then(filter((result) => result.winner === 'Worms'))
    .then(length)
    .tap(console.log.bind(console, allStats))
}
//
// test('combatBalance', () => {
//   return Promise.all([
//     runCombatBatch(exploreMock(100, 'arcane', 'death'), 100, 100),
//     runCombatBatch(exploreMock(90, 'arcane', 'death'), 100, 90),
//     runCombatBatch(exploreMock(80, 'arcane', 'death'), 100, 80),
//     runCombatBatch(exploreMock(70, 'arcane', 'death'), 100, 70),
//     runCombatBatch(exploreMock(1, 'arcane', 'rat'), 100, 1),
//     runCombatBatch(exploreMock(5, 'arcane', 'rat'), 100, 5),
//     runCombatBatch(exploreMock(10, 'arcane', 'rat'), 100, 10),
//     runCombatBatch(exploreMock(20, 'arcane', 'rat'), 100, 20),
//     runCombatBatch(exploreMock(30, 'arcane', 'rat'), 100, 30),
//   ])
// })


