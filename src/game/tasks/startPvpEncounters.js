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

function findChars (dao, combat) {
  return dao.character.aggregate([
    {
      $match: buildMembersQuery(combat),
    },
    {
      lookup: {
        from: 'player',
        localField: 'playerId',
        foreignField: '_id',
        as: 'player',
      },
    },
  ])
}

function sendMessages (dao, dispatch, combat) {
  console.log('sendMessages', { dao, dispatch, combat })
  return findChars(dao, combat)
    .map(char => renderCombat(char.player, combat))
    .map(dispatch)
}

function encounterPlayers (dao, dispatch) {
  return Promise.all(encounter(dao))
    .map(partial(sendMessages, [dao, dispatch]))
}

export default function startPvpEncounterTimer (dao, dispatch) {
  console.log('Starting ramdom PvP timer...')
  setInterval(() => encounterPlayers(dao, dispatch), 10000)
}
