import {
  partial,
} from 'ramda'

import { rollBatch } from '../dice'


function runInitiative (teams, rolls) {
  const names = teams.map(team => team.overall.name)

  if (rolls[names[0]] === rolls[names[1]]) {
    return initiative(teams)
  }

  if (rolls[names[0]] > rolls[names[1]]) {
    return {
      order: [teams[0], teams[1]],
      rolls,
    }
  }

  return {
    order: [teams[1], teams[0]],
    rolls,
  }
}

export default function initiative (teams) {
  return rollBatch(20, [teams[0].overall.name, teams[1].overall.name])
    .then(partial(runInitiative, [teams]))
}
