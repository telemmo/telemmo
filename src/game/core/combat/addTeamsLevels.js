import {
  find,
  partial,
  propEq,
  propOr,
  pipe,
  merge,
} from 'ramda'

import { level } from '../level'
import { teamsMemberIds } from './utils'

function mergeLevel (teams, computedExps) {
  return teams.map(team =>
    team.map((char) => {
      if (char.prizes) { return char }
      const charExp = pipe(find(propEq('_id', char.id)), propOr(0, 'exp'))
      const exp = charExp(computedExps)
      return merge(char, { exp, level: level({ exp }) })
    }))
}

export default function (dao, teams) {
  const members = teamsMemberIds(teams)

  return dao.combat.aggregate([
    { $match: { winners: { $in: members } } },
    { $project: { prizes: 1 } },
    { $unwind: '$prizes' },
    { $project: {
      charId: '$prizes.charId',
      exp: '$prizes.exp',
      elo: '$prizes.elo',
    } },
    { $group: {
      _id: '$charId',
      exp: { $sum: '$exp' },
      elo: { $sum: '$elo' },
    } },
  ])
    .then(partial(mergeLevel, [teams]))
}
