import {
  map,
  mapObjIndexed,
  without,
} from 'ramda'
import { charsByMap } from './maps'
import { run } from './combat'

const randomFromArray = array =>
  array[Math.floor(Math.random() * array.length)]

const randomEncounter = mapObjIndexed((players, mapId) => {
  if (players.length < 2) {
    return []
  }
  const first = randomFromArray(players)
  const second = randomFromArray(without([first], players))
  const teams = [[first], [second]]

  return {
    mapId,
    teams,
  }
})

const encounterSource = enc => ({
  name: 'pvp',
  id: enc.mapId,
})

export function encounter (dao) {
  return charsByMap(dao)
    .then(randomEncounter)
    .then(map(enc => run(dao, encounterSource(enc), enc.teams)))
    .then(Promise.all)
}
