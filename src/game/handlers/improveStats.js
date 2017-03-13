import {
  pipe,
  curry,
  splitEvery,
  merge,
  head,
} from 'ramda'
import { ObjectId } from 'mongodb'

import membersExp from '../core/membersExp'
import { level } from '../core/level'
import { getStatCost, getCurrentStatPoints } from './statHelpers'
import {
  showBonus,
  equippedIds,
  equipDetails,
  mergeEquipBonuses,
} from './equipHelpers'

function buttons (char, statNames) {
  return statNames.map(statName =>
    `:heavy_plus_sign: /up_${statName} (-${getStatCost(char, statName)})`
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
    .then(char => ({
      char,
      equipBonuses: curry(showBonus)(
        pipe(equippedIds, equipDetails, mergeEquipBonuses)(char),
      ),
    }))
    .then(({ char, equipBonuses }) => ({
      to: msg.chat,
      options: keyboard(char),
      text: [
        _('Improve your character!'),
        '',
        _('/reset_stats for free anytime!'),
        '',
        _('<b>Level:</b> %s', char.level),
        _('<b>StatPoints: </b> %s', getCurrentStatPoints(char)),
        '',
        _('Base stats and equipment bonuses:'),
        _('<b>Strength: </b> %s %s', char.str, equipBonuses('str')),
        _('<b>Constitution: </b> %s %s', char.con, equipBonuses('con')),
        _('<b>Reflex: </b> %s %s', char.ref, equipBonuses('ref')),
        _('<b>Accuracy: </b> %s %s', char.acc, equipBonuses('acc')),
        _('<b>Flow: </b> %s %s', char.flow, equipBonuses('flow')),
      ].join('\n'),
    }))
}
