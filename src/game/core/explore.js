import {
  prop,
  pipe,
  identity,
  contains,
  ifElse,
  isNil,
  tap,
} from 'ramda'

import { Observable } from 'rx'

import { maps, monsters } from '../models'

import { run } from './combat'


const píckMapFromDB =  (mapId)=> maps.find(mapId)


export function randomMonster (monsters, pickMonsterFn=monsters.find) {
  const monsterPool = monsters.reduce((acc, monster) => [
    ...acc,
    ...Array.from({ length: monster.influence }, ()=> monster.id ),
  ], [])
  const monsterId = monsterPool[Math.floor(Math.random() * monsterPool.length)]
  const monster = pickMonsterFn(monsterId)
  return monster
}

export function exploreUntilDead (dao, player, gameMap, char) {
  return Observable.create((subscriber) => {
    function fight () {
      const monster = randomMonster(gameMap.id)
      const source = { name: 'map', id: gameMap.id }

      return run(dao, source, [[monster], [char]])
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
        .catch(() => console.log('Invalid combat token, refusing to save'))
    }

    fight()
  })
}

