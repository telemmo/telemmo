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

const ourMembers = pipe(
  head,
  prop('members'),
)

const theirMembers = pipe(
  last,
  prop('members'),
)

const randomFromArray = arr => arr[Math.floor((Math.random() * arr.length))]

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
        [drop.type]: randomFromArray(prizesPool),
      }
    })
}

function attachPrizes ({ teams }, rolls) {
  const ours = ourMembers(teams)
  const theirs = theirMembers(teams)

  const giveLoot = char => theirs.reduce((prizes, enemy) => {
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
  }, [])

  const allPrizes = reduce((allLoot, char) => {
    return [
      ...allLoot,
      ...giveLoot(char),
    ]
  }, [])

  return allPrizes(ours)
}

const rolls = map(prop('dice'), dropTypes)

export default function (combat) {
  return rollBatch(10000, rolls)
    .then(partial(attachPrizes, [combat]))
    .then(set(lensProp('prizes'), __, combat))
}

