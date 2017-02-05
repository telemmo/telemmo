import {
  partial,
  nth,
} from 'ramda'

import { ObjectId } from 'mongodb'
import models from '../models'
import { reject, rejectUndefined } from './errors'

function changeStance (dao, playerId, stance, char) {
  return dao.character.update(
    { _id: char.id },
    { $set: { stance } },
  )
}

function checkStance (_, msg, char, stanceId) {
  try {
    const currentClass = models.classes.find(char.classId)

    if (!currentClass.stances.find(sId => sId === stanceId)) {
      return reject(msg, _(':x: Invalid stance'))
    }

    return char
  } catch (e) {
    return reject(msg, _(':x: Invalid stance'))
  }
}

export default function call (dao, provider, _, msg) {
  try {
    const stanceId = msg.matches[1]
    const stance = models.stances.find(stanceId)
    const charId = msg.player.currentCharId

    return dao.character
      .find({
        _id: ObjectId(charId),
      })
      .then(nth(0))
      .then(rejectUndefined(msg, _(':x: Invalid stance')))
      .then(char => checkStance(_, msg, char, stance.id))
      .then(partial(changeStance, [dao, msg.player.id, stance.id]))
      .then(() => ({
        to: msg.chat,
        text: _(':ok: You are now using <b>%s</b> %s', stance.name, stance.emoji),
      }))
  } catch (e) {
    return reject(msg, _(':x: Invalid stance'))
  }
}

