import {
  map,
  head,
  without,
  pipe,
  isEmpty,
  filter,
  not,
} from 'ramda'
import { charsByMap } from './maps'
import { run } from './combat'

const randomFromArray = array =>
  array[Math.floor(Math.random() * array.length)]

const randomEncounter = pipe(
  map(({ _id: mapId, chars }) => {
    if (chars.length < 2) {
      return []
    }
    const first = randomFromArray(chars)
    const second = randomFromArray(without([first], chars))
    const teams = [[first], [second]]
    return {
      teams,
      mapId,
    }
  }),
  filter(pipe(isEmpty, not)),
)

const encounterSource = enc => ({
  name: 'pvp',
  id: enc.mapId,
})

export function encounter (dao) {
  return charsByMap(dao)
    .tap(console.log.bind(null, 'Chars by map:'))
    .then(randomEncounter)
    .tap(pipe(JSON.stringify, console.log.bind(null, 'Random Encounter:')))
    .map(enc => run(dao, encounterSource(enc), enc.teams))
    .tap(console.log.bind(null, 'Combat Result:'))
    .catch(console.log.bind(null, 'Error:'))
}
