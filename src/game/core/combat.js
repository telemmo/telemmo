import {
  map,
} from 'ramda'

import level from './level'
import { buildCombatStats } from './combat'
import { roll, rollBatch } from './dice'

function initiative({ team1, team2 }) {
  rollBatch(20, ['team1', 'team2'])
    .then((rolls) => {
      if (rolls.team1 > rolls.team2) {
        return { first: team1, second: team2  }
      }
      return { first: team2, second: team1  }
    })
}

function fight ({ first, second }) {
}

function combat (team1, team2) {
  const built = {
    // wont work because stances are unique and needs to be an array
    team1: team1.reduce((team, fighter) =>
      mergeWith(add, team, fighter)),
    team2: team2.reduce((team, fighter) =>
      mergeWith(add, team, fighter)),
  }
  return Promise.resolve(built)
  .then(initiative)
  .then(fight)
}

combat(
  [{ str: 10, int: 10, ref: 10, acc: 10, con: 10, kno: 10 }],
  [{ str: 10, int: 10, ref: 10, acc: 10, con: 10, kno: 10 }],
)
