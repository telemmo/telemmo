import {
  toPairs,
  without,
  pipe,
} from 'ramda'
import { charsByMap } from './maps'
import { run } from './combat'

const randomFromArray = array =>
  array[Math.floor(Math.random() * array.length)]

const randomEncounter = pipe(
  toPairs,
  map(([mapId, players]) => {
    if (players.length < 2) {
      return []
    }
    const first = randomFromArray(players)
    const second = randomFromArray(without([first], players))
    return [[first], [second]]
  })
)

function encounter (dao) {
  return charsByMap()
    .then(randomEncounter)
    .then(map(run))
    .then(Promise.all)
}
