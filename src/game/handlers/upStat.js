import {
  isNil,
  always,
  merge,
  head,
  pick,
} from 'ramda'
import { ObjectId } from 'mongodb'

import membersExp from '../core/membersExp'
import { level } from '../core/level'
import { reject } from './errors'

import { capitalize } from './helpers'
import { statUpgradeCost, unspentStatPoints, statIds } from './statHelpers'

function updateStat (dao, char, statId, changeAmount = 1) {
  const currentStatScore = char[statId]
  const query = pick(['_id', 'updatedAt'], char)

  return dao.character.update(query, {
    $set: { [statId]: currentStatScore + changeAmount },
  })
}

export default function call (dao, provider, _, msg) {
  const statName = msg.matches[2]
  const statId = statIds[statName]
  const changeType = msg.matches[1] === 'up' ? 'upgrade' : msg.matches[1]
  const changeAmount = isNil(msg.matches[3]) ? 1 : parseInt(msg.matches[3], 10)

  if (statId === undefined) {
    reject(msg, _('Invalid stat.'))
  }

  return dao.character.find({
    _id: msg.player.currentCharId,
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
    .then((char) => {
      if (changeType === 'upgrade') {
        if (char[statId] + changeAmount > 100) {
          return reject(msg, _('You cant have more than 100 points.'))
        }
        if (statUpgradeCost(char[statId], changeAmount) > unspentStatPoints(char)) {
          return reject(msg, _('You dont have points for that.'))
        }
        return updateStat(dao, char, statId, changeAmount)
      } else if (changeType === 'refund') {
        if (char[statId] - changeAmount < 5) {
          return reject(msg, _('You cant have less than 5 points.'))
        }
        return updateStat(dao, char, statId, -changeAmount)
      }
    })
    .then(always({
      to: msg.chat,
      text: _(
        '%s %s by %s!',
        capitalize(statName),
        changeType === 'refund' ? _('reduced') : _('increased'),
        changeAmount),
    }))
}

