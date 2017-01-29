import { ObjectId } from 'mongodb'
import {
  assocPath,
  flatten,
  partial,
  filter,
  pipe,
  prop,
  uniq,
  map,
  __,
} from 'ramda'

import { start } from '../core/combat'
import { render } from '../handlers/explore'
import _ from '../i18n'

const members = pipe(
  prop('teams'),
  flatten,
  map(prop('members')),
  flatten,
  filter(pipe(prop('id'), ObjectId.isValid)),
  map(prop('playerId')),
  uniq,
  assocPath(['_id', '$in'], __, {}),
)
function renderCombat (combat, player) {
  return {
    to: player.providers.telegram.id,
    text: render(_.singular(player.language), player, combat),
  }
}

function renderMessages (dao, combats) {
  return Promise.all(
    combats.map(combat =>
      dao.player.find(members(combat))
      .then(map(partial(renderCombat, [combat]))),
    ))
    .then(flatten)
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
    .then(combats => renderMessages(dao, combats))
    .then(messages => Promise.all(messages.map(dispatch)))
    .then(combats => console.log(`${combats.length} combats resumed`))
}
