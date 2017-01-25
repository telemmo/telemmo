import {
  add,
  mergeWith,
  concat,
  ifElse,
  partial,
  isArrayLike,
  view,
  set,
  merge,
  lensPath,
  lensProp,
  reverse,
} from 'ramda'

import Promise from 'bluebird'

import { buildCombatStats } from './combatStats'
import randomSkillFromStance from './randomSkillFromStance'
import { rollBatch } from './dice'

const overallInit = lensPath(['overall', 'init'])

function runInitiative (teams, rolls) {
  const team1init = rolls.team1 + view(overallInit, teams[0])
  const team2init = rolls.team2 + view(overallInit, teams[1])

  if (team1init === team2init) {
    return initiative(teams)
  }

  if (team1init > team2init) {
    return { teams: [teams[0], teams[1]] }
  }

  return [teams[1], teams[0]]
}

function initiative (teams) {
  return rollBatch(20, ['team1', 'team2'])
    .then(partial(runInitiative, [teams]))
}

function runTurn (combat, rolls) {
  const { teams } = combat

  const skill = (rolls.skill + teams[0].overall.flow) - teams[1].overall.flow
  const aim = (rolls.aim + teams[0].overall.ref) - teams[1].overall.dod
  const hit = (rolls.hit + teams[0].overall.atk) - teams[1].overall.def

  let dmg = Math.max(
    Math.ceil(
      hit + teams[0].overall.atk - teams[1].overall.def) / 5, 0)

  if (rolls.aim === 1 || aim < 10) {
    dmg = 0
  }

  if (rolls.aim === 10) {
    dmg *= 2
  }

  const defenderHp = lensPath(['teams', 1, 'overall', 'hp'])

  if (hit > 10) {
    combat = set(defenderHp, view(defenderHp, combat) - dmg, combat)
  }

  let casts = []

  if (skill > 10) {
    teams[0].members.forEach((member) => {
      const random = randomSkillFromStance(member.stance)
      const afterCast = random.fire(combat)
      combat = afterCast.combat
      casts = casts.concat([afterCast.cast])
    })
  }

  if (view(defenderHp, combat) <= 0) {
    combat =  set(lensProp('finishedAt'), new Date(), combat)
  }

  const newTurn = {
    attacker: combat.teams[0],
    defender: combat.teams[1],
    damage: dmg,
    rolls: {
      skill: rolls.skill,
      aim: rolls.aim,
      hit: rolls.hit,
    },
    casts,
  }

  combat = merge(combat, {
    turns: [...combat.turns, newTurn],
    teams: reverse(combat.teams),
  })

  return combat
}

function turn (combat) {
  return rollBatch(20, ['skill', 'aim', 'hit'])
    .then(partial(runTurn, [combat]))
}

function build (tms) {
  return Promise.resolve(tms)
    .then(initiative)
    .then(teams =>
      Promise.all(teams.map(team =>
        Promise.all(team.map(buildCombatStats)))))
    .then(teams => teams.map(buildTeam))
    .then(teams => ({
      teams,
      startedAt: new Date(),
      turns: [
        { initiative: teams[0] },
      ],
    }))
}

function start (combat) {
  function* generate () {
    let state = combat
    while (!state.finishedAt) {
      state = yield turn(state)
    }
    console.log(JSON.stringify(state.turns, null, 2))
  }

  return Promise.resolve()
    .then(Promise.coroutine(generate))
    .then(console.log)
    .catch(console.error)
}

export function create (teams) {
  return build(teams)
    .then(start)
}


export function test () {
  const teams = [
    [{ stance: 'arcane', str: 10, int: 10, ref: 10, acc: 10, con: 10, kno: 10, equips: { weapon: 'poison_dagger', token: 'spidy', set: 'spider_web_clothes' } }],
    [{ stance: 'arcane', str: 10, int: 10, ref: 10, acc: 10, con: 10, kno: 10, equips: { weapon: 'poison_dagger', token: 'spidy', set: 'spider_web_clothes' } }],
  ]

  create(teams).then(console.log.bind(null, 'test:'))
}


function mergeFighter (a, b) {
  return ifElse(
    isArrayLike,
    concat([b]),
    add(b),
  )(a)
}

function buildTeam (members) {
  return {
    overall: members.reduce((acc, fighter) =>
      mergeWith(mergeFighter, acc, fighter),
      { stance: [] }),
    members,
  }
}
