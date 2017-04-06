import {
  partial,
  objOf,
  merge,
  pipe,
  map,
} from 'ramda'

import Promise from 'bluebird'

import { encounter } from '../core/pvp'
import { buildMembersQuery } from '../core/combat'
import { renderCombat } from '../handlers/explore'

function findPlayer (dao, char) {
  return dao.player.find({ _id: char.id })
    .then(pipe(objOf('player'), merge(char)))
}

function findChars (dao, combat) {
  return dao.character
    .find(buildMembersQuery(combat))
    .map(partial(findPlayer, [dao]))
}

function sendMessages (dao, dispatch, combat) {
  return findChars(dao, combat)
    .map(char => renderCombat(char.player, combat))
    .map(dispatch)
}

function encounterPlayers (dao, dispatch) {
  setTimeout(partial(encounterPlayers, [dao, dispatch]), 5000)

  return encounter(dao)
    .then(map(partial(sendMessages, [dao, dispatch])))
    .then(Promise.all)
}

export default function startPvpEncounterTimer (dao, dispatch) {
  console.log('Starting ramdom PvP timer...')
  encounterPlayers(dao, dispatch)
}
