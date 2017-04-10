import {
  __,
  partial,
  set,
  lensProp,
  map,
  pipe,
  head,
  last,
  prop,
  reduce,
} from 'ramda'

import { rollBatch } from '../dice'
import { expRatio, dropTypes } from '../../models/drops'
import pickRandom from '../pickRandom'
import weightedPool from '../weightedPool'
import elo from './elo'

const ourMembers = pipe(head, prop('members'))
const theirMembers = pipe(last, prop('members'))

function getDrops (char, enemy, rolls) {
  return dropTypes
    .filter((drop) => {
      const prizesPool = enemy.prizes[`${drop.dice}s`]
      if (rolls[drop.dice] < drop.chance && prizesPool) {
        return true
      }
      return false
    })
    .map((drop) => {
      const prizesPool = enemy.prizes[`${drop.dice}s`]
      return {
        charId: char.id,
        [drop.type]: pickRandom(weightedPool(prizesPool, 'weight')),
      }
    })
}

function attachPrizes ({ teams, source }, rolls) {
  const ours = ourMembers(teams)
  const theirs = theirMembers(teams)

  const giveLoot = char => reduce((prizes, enemy) => {
    if (!enemy.prizes) {
      return prizes
    }

    return [
      {
        charId: char.id,
        exp: enemy.prizes.exp * expRatio,
      },
      ...prizes,
      ...getDrops(char, enemy, rolls),
    ]
  }, [], theirs)

  const giveElo = char => reduce((prizes, enemy) => {
    if (source.name !== 'pvp') {
      return prizes
    }

    const [winner, loser] = elo(char, enemy)

    return [
      {
        charId: char.id,
        elo: winner.elo,
      },
      {
        charId: enemy.id,
        elo: loser.elo,
      },
    ]
  }, [], theirs)

  const allPrizes = reduce((allLoot, char) => [
    ...allLoot,
    ...giveLoot(char),
    ...giveElo(char),
  ], [])

  return allPrizes(ours)
}

const rolls = map(prop('dice'), dropTypes)

export default function (combat) {
  return rollBatch(10000, rolls)
    .then(partial(attachPrizes, [combat]))
    .then(set(lensProp('prizes'), __, combat))
}

