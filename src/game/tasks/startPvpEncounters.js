import { ObjectId } from 'mongodb'
import {
  assocPath,
  flatten,
  partial,
  filter,
  pipe,
  head,
  prop,
  uniq,
  map,
  __,
} from 'ramda'


import Promise from 'bluebird'

import { encounter } from '../core/pvp'
import { renderCombat } from '../handlers/combat'

function dispatchCombat(dao, dispatch, combat) {
  return Promise.coroutine(function *() {
    const chars = yield dao.character.find(buildMembersQuery(combat))
    return dispatch(renderCombat(player, combat))
  })
}

function encounterPlayers(dao, dispatch) {
  setTimeout(encounterPlayers, 5000)

  return encounter(dao)
    .then(map(partial(dispatchCombat, [dao, dispatch])))
    .then(Promise.all)
}

export default function startPvpEncounterTimer (dao, dispatch) {
  console.log('Starting ramdom PvP timer...')
  encounterPlayers(dao, dispatch)
}
