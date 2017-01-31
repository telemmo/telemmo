import {
  splitEvery,
  merge,
  head,
} from 'ramda'
import { ObjectId } from 'mongodb'

import membersExp from '../core/membersExp'
import { level } from '../core/level'
import { getStatCost, getCurrentStatPoints } from './statHelpers'

function buttons (char, statNames) {
  return statNames.map(statName =>
    `:heavy_plus_sign: /up_${statName} (${getStatCost(char, statName)})`
  )
}

function keyboard (char) {
  return splitEvery(2,
    buttons(char, [
      'strength',
      'constitution',
      'reflex',
      'accuracy',
      'flow',
    ]).concat([
      ':arrow_left: /overworld',
    ]),
  )
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
        options: keyboard(char),
        text: [
          _('Improve your character. you can reset your stats for free with /reset_stats\n'),
          _('Level: %s', char.level),
          _('StatPoints: %s\n', getCurrentStatPoints(char)),
          _('Strength: %s', char.str),
          _('Constitution: %s', char.con),
          _('Reflex: %s', char.ref),
          _('Accuracy: %s', char.acc),
          _('Flow: %s', char.flow),
        ].join('\n')
      }
    })
}

