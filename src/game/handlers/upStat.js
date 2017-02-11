import {
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
import { getStatCost, getCurrentStatPoints, statIds } from './statHelpers'

function increaseStat (dao, char, statId) {
  const amount = char[statId]
  const query = pick(['_id', 'updatedAt'], char)
  return dao.character.update(query, {
    $set: { [statId]: amount + 1 },
  })
}

export default function call (dao, provider, _, msg) {
  const statName = msg.matches[1]
  const statId = statIds[statName]

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
      if (char[statId] === 100) {
        return reject(msg, _('You cant have more than 100 points.'))
      }
      if (getStatCost(char, statName) <= getCurrentStatPoints(char)) {
        return increaseStat(dao, char, statId)
      }
      return reject(msg, _('You dont have points for that.'))
    })
    .then(always({
      to: msg.chat,
      text: _('%s increased by 1!', capitalize(statName)),
    }))
}

