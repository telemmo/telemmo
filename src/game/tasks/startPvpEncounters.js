import {
  pipe,
  flip,
  prop,
  curry,
  partial,
} from 'ramda'

import Promise from 'bluebird'

import { encounter } from '../core/pvp'
import { buildMembersQuery } from '../core/combat'
import renderCombat from '../renderers/combat'

function findChars (dao, combat) {
  return dao.character.aggregate([
    {
      $match: buildMembersQuery(combat),
    },
    {
      $lookup: {
        from: 'player',
        localField: 'playerId',
        foreignField: '_id',
        as: 'player',
      },
    },
    {
      $unwind: '$player',
    },
  ])
}

function sendMessages (dao, dispatch, combat) {
  console.log('sendMessages', { dao, dispatch, combat })
  return findChars(dao, combat).map(pipe(
    prop('player'),
    curry(flip(renderCombat))(combat),
    dispatch,
  ))
    .then(Promise.all)
}

function encounterPlayers (dao, dispatch) {
  return Promise.all(encounter(dao))
    .tap(pipe(JSON.stringify, console.log.bind(null, 'Encounter results:')))
    .map(partial(sendMessages, [dao, dispatch]))
}

export default function startPvpEncounterTimer (dao, dispatch) {
  console.log('Starting ramdom PvP timer...')
  setInterval(() => encounterPlayers(dao, dispatch), 2 * 60 * 1000)
  return encounterPlayers(dao, dispatch)
}

