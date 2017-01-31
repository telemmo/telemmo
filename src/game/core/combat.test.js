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

function runCombatBatch (teams, amount, log) {
  return Promise.all(times(partial(runCombat, [teams]), amount))
    .tap((combats) => {
      expect(combats.length).toBe(amount)
    })
    .then(filter((result) => result.winner === 'Worms'))
    .then(length)
    .tap(console.log.bind(console, log))
}

test.skip('combat', () => {
  const teams = (exploreMock(100, 'arcane', 'death'))
  return runCombat(teams)
    // .tap(c => console.log(JSON.stringify(c, null, 2)))
})

test.skip('combatBalance', () => {
  return Promise.all([
    // runCombatBatch(exploreMock(5, 'breaker', 'snake'), 100, 'breaker'),
  ])
})

