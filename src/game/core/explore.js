import {
  prop,
  pipe,
  always,
  identity,
  contains,
  partial,
  merge,
  objOf,
  ifElse,
  isNil,
  tap,
} from 'ramda'

import { Observable } from 'rx'

import models from '../models'
import { run } from './combat'
import { weightedPool, pickRandom } from './utils'

export function randomMonster (mapId) {
  const mapObj = models.maps.find(mapId)
  const monsterId = pickRandom(weightedPool(mapObj.monsters))
  return models.monsters.find(monsterId)
}

const playerExplorations = pipe(
  prop('id'),
  objOf('teams.members.playerId'),
  merge({ finishedAt: { $exists: false } })
)

export function exploreUntilDead (dao, player, gameMap, char) {
  return Observable.create((subscriber) => {
    function fight () {
      const monster = randomMonster(gameMap.id)
      const source = { name: 'map', id: gameMap.id }

      return dao.combat.destroy(playerExplorations(player), { hard: true })
        .then(partial(run, [dao, source, [[monster], [char]]]))
        .then(ifElse(
          isNil,
          () => Promise.reject(new Error()),
          identity,
        ))
        .then(tap(subscriber.next.bind(subscriber)))
        .then(ifElse(
          pipe(prop('winners'), contains(player.currentCharId)),
          fight,
          identity,
        ))
        .catch(partial(console.log, ['Invalid combat token']))
    }

    fight()
  })
}

