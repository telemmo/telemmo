import {
  merge,
  head,
} from 'ramda'

import { ObjectId } from 'mongodb'

import { level } from '../core/level'
import membersExp from '../core/membersExp'

import { rejectUndefined } from './errors'
import { capitalize } from './helpers'

export default function call (dao, provider, _, msg) {
  return dao.character
    .find({
      _id: ObjectId(msg.player.currentCharId),
    })
    .then(head)
    .then(rejectUndefined(msg, _('Invalid char Id')))
    .then(char => membersExp(dao, [ObjectId(char.id)])
      .then(head)
      .then(expObj => merge(char, {
        exp: expObj ? expObj.exp : 0,
      }))
      .then(charWithoutLevel => merge(charWithoutLevel, {
        level: level(charWithoutLevel),
      })),
    )
    .then(char => ({
      to: msg.chat,
      text: _(
        '<b>Name:</b> %s\n<b>Class:</b> %s\n<b>Stance:</b> %s\n<b>Level:</b> %s\n<b>Exp:</b> %s\n\n%s',
        char.name,
        capitalize(char.classId),
        capitalize(char.stance),
        char.level,
        char.exp,
        [ _('Strength: %s', char.str),
          _('Constitution: %s', char.con),
          _('Reflex: %s', char.ref),
          _('Accuracy: %s', char.acc),
          _('Flow: %s', char.flow),
        ].join('\n')
      ),
    }))
}

