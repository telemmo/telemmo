import {
  pipe,
  curry,
  toPairs,
  splitEvery,
  merge,
  head,
} from 'ramda'
import { ObjectId } from 'mongodb'

import membersExp from '../core/membersExp'
import { level } from '../core/level'
import { statUpgradeCost, unspentStatPoints, statIds } from './statHelpers'
import {
  showBonus,
  equippedIds,
  equipDetails,
  mergeEquipBonuses,
} from './equipHelpers'

function statUpgradeButtons (char) {
  return toPairs(statIds).map(([statName, statId]) =>
    `:heavy_plus_sign: /up_${statName} (-${statUpgradeCost(char[statId])})`,
  )
}

function keyboard (char) {
  return splitEvery(
    2,
    [...statUpgradeButtons(char), ':arrow_left: /overworld'],
  )
}

export default function call (dao, provider, _, msg) {
  return dao.character.find({ _id: msg.player.currentCharId })
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
        _('Change stats in large amounts with'),
        _('/up_flow_10 or /refund_flow_7'),
        '',
        _('/reset_stats for free anytime!'),
        '',
        _('<b>Level:</b> %s', char.level),
        _('<b>StatPoints: </b> %s', unspentStatPoints(char)),
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
