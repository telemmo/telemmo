import { ObjectId } from 'mongodb'
import {
  assocPath,
  identity,
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
import { Observable } from 'rx'

import { start } from '../core/combat'
import { exploreUntilDead } from '../core/explore'
import { render } from '../handlers/explore'
import models from '../models'
import _ from '../i18n'

const members = pipe(
  prop('teams'),
  flatten,
  map(prop('members')),
  flatten,
  map(prop('id')),
  filter(ObjectId.isValid),
  uniq,
  assocPath(['_id', '$in'], __, {}),
)

function renderCombat (player, combat) {
  return {
    to: player.providers.telegram.id,
    text: render(_.singular(player.language), player, combat),
  }
}

function continueExploration (dao, dispatch, combats) {
  const explorations = combats.map(
    Promise.coroutine(function* (combat) {
      console.log(combat)
      const gameMap = models.maps.find(combat.source.id)
      const char = yield dao.character.find(members(combat)).then(head)
      const player = yield dao.player.find(char.playerId).then(head)

      exploreUntilDead(dao, player, gameMap, char)
        .map(partial(renderCombat, [player]))
        .subscribe(dispatch)

      return dispatch(renderCombat(player, combat))
    }),
  )

  return Promise.all(explorations)
}

function startCombat (combat) {
  console.log('Resuming combat', combat.id)
  return start(combat)
}

export default function resumeCombats (dao, dispatch) {
  console.log('Resuming combats...')
  return dao.combat.find({ finishedAt: { $exists: false } })
    .then(combats => Promise.all(combats.map(startCombat)))
    .then(combats => Promise.all(combats.map(combat =>
        dao.combat.update({ _id: combat.id }, combat))))
    .then(combats => continueExploration(dao, dispatch, combats))
}
