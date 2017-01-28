import {
  always,
} from 'ramda'

import models from '../models'

export function randomMonster (mapId) {
  const mapObj = models.maps.find(mapId)
  const monsterPool = mapObj.monsters.reduce((acc, monster) => [
    ...acc,
    ...Array.from({ length: monster.influence }).map(always(monster.id)),
  ], [])
  const monsterId = monsterPool[Math.floor(Math.random() * monsterPool.length)]
  const monster = models.monsters.find(monsterId)
  return monster
}

