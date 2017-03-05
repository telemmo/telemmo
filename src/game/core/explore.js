import {
  prop,
  pipe,
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

import {
  maps,
  monsters,
} from '../models'

import { run } from './combat'

export function randomMonster (monsters, pickMonsterFn=monsters.find) {
  const monsterPool = monsters.reduce((acc, monster) => [
    ...acc,
    ...Array.from({ length: monster.influence }, ()=> monster.id ),
  ], [])
  const monsterId = monsterPool[Math.floor(Math.random() * monsterPool.length)]
  const monster = pickMonsterFn(monsterId)
  return monster
}

const playerExplorations = pipe(
  prop('id'),
  objOf('teams.members.playerId'),
  merge({ finishedAt: { $exists: false } })
)

export function exploreUntilDead (dao, player, gameMap, char) {
  return Observable.create((subscriber) => {
    function fight () {
      const monster = randomMonster(gameMap.monsters)
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

