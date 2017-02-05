import {
  partial,
  prop,
  head,
  ifElse,
  contains,
  identity,
  always,
  tap,
} from 'ramda'

import { ObjectId } from 'mongodb'
import { reject, rejectUndefined } from './errors'
import membersEquips from './membersEquips'
import models from '../models'

function equipChar (dao, equipId, charId) {
  const equip = models.equips.find(equipId)
  return dao.character.update({ _id: ObjectId(charId) }, {
    $set: {
      [`equips.${equip.type}`]: equipId,
    },
  })
}

export default function call (dao, provider, _, msg) {

  const equipId = msg.matches[1]

  if (!models.equips.all.find(equip => equip.id === equipId)) {
    return reject(msg, _('This equips doesn\'t exist.'))
  }

  return dao.character
    .find({ playerId: msg.player.id })
    .then(chars => chars.map(char => ObjectId(char.id)))
    .then(partial(membersEquips, [dao]))
    .then(head)
    .then(rejectUndefined(msg, _('You don\'t have this equip.')))
    .then(prop('equips'))
    .then(ifElse(contains(equipId), identity, always(null)))
    .then(rejectUndefined(msg, _('You don\'t have this equip.')))
    .then(() => equipChar(dao, equipId, msg.player.currentCharId))
    .then(always({
      to: msg.chat,
      text: _('%s equiped!', models.equips.find(equipId).name),
    }))
}

