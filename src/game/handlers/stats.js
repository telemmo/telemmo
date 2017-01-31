import {
  merge,
  head,
} from 'ramda'
import { ObjectId } from 'mongodb'

import membersExp from '../core/membersExp'
import { level } from '../core/level'

function keyboard () {
  return [
    [':heavy_plus_sign: /up_strength', ':heavy_plus_sign: /up_constitution'],
    [':heavy_plus_sign: /up_reflex', ':heavy_plus_sign: /up_accuracy'],
    [':heavy_plus_sign: /up_flow'],
    [':arrows_counterclockwise: /reset_stats', ':arrow_left: /overworld'],
  ]
}

export default function call (dao, provider, _, msg) {
  return dao.character.find({
      _id: msg.player.currentCharId
    })
    .then(head)
    .then(char => membersExp(dao, [ObjectId(char.id)])
      .then(head)
      .then(expObj => merge(char, {
        exp: expObj ? expObj.exp : 0,
      }))
      .then(charWithoutLevel => merge(charWithoutLevel, {
        level: level(charWithoutLevel),
      })),
    )
    .then(char => {
      return {
        to: msg.chat,
        options: keyboard(),
        text: [
          _('Improve your character.\n'),
          _('Level: %s\n', char.level),
          _('Strength: %s', char.str),
          _('Constitution: %s', char.con),
          _('Reflex: %s', char.ref),
          _('Accuracy: %s', char.acc),
          _('Flow: %s', char.flow),
        ].join('\n')
      }
    })
}

