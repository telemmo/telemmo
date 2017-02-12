import {
  partial,
  always,
  nth,
} from 'ramda'

import { ObjectId } from 'mongodb'

import { reject, rejectUndefined } from './errors'
import { useChar } from '../core/char'

export default function call (dao, provider, _, msg) {
  const charId = msg.matches[1]

  if (!ObjectId.isValid(charId)) {
    return reject(msg, _('Character ID is not a valid key ID'))
  }

  return dao.character
    .find({
      _id: ObjectId(charId),
      playerId: msg.player.id,
    })
    .then(nth(0))
    .then(rejectUndefined(msg, _('This character for this player was not found.')))
    .then(partial(useChar, [dao, msg.player.id]))
    .then(char => ({
      to: msg.chat,
      text: _('You are now using <b>%s</b>', char.name),
    }))
    .catch(always({
      to: msg.chat,
      text: _('This character is currently exploring a map.\nWait it come back before changing char.'),
    }))
}

