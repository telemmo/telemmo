import {
  add,
  always,
  mergeWith,
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
    return [teams[0], teams[1]]
  }

  return [teams[1], teams[0]]
}

function initiative (teams) {
  return rollBatch(20, ['team1', 'team2'])
    .then(partial(runInitiative, [teams]))
}

function runTurn (combat, rolls) {
  const { teams } = combat

  const statPointRelevance = 7
  const sr = statPointRelevance

  const skill = (rolls.skill + teams[0].overall.flow/sr) - teams[1].overall.flow/sr
  const aim = (rolls.aim + teams[0].overall.ref/sr) - teams[1].overall.dod/sr
  const hit = (rolls.hit + teams[0].overall.atk/sr) - teams[1].overall.def/sr

  let dmg = Math.max(
    Math.ceil(
      hit + (teams[0].overall.atk - teams[1].overall.def)/sr), 1)

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
    combat = set(lensProp('finishedAt'), new Date(), combat)
    // vv test only
    combat = set(lensProp('winner'), combat.teams[0].members[0].name, combat)
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
    .then(teams => {
      return Promise.all(teams.map(team =>
        Promise.all(team.map(buildCombatStats))))
    })
    .then(teams => teams.map(buildTeam))
    .then(initiative)
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
    return state
  }

  return Promise.resolve()
    .then(Promise.coroutine(generate))
}

function testFight (stances, s, s2) {
  s2 = s2 || s
  const teams = [
    [{ name: '1', stance: stances[0], str: s, int: s, ref: s, acc: s, con: s, kno: s, equips: {} }],
    [{ name: '2', stance: stances[1], str: s2, int: s2, ref: s2, acc: s2, con: s2, kno: s2, equips: {} }],
  ]


  Promise.all(Array.from({ length: 1000 })
    .map(() => build(teams).then(start)))
    .then(cs => cs.filter(c => c.winner === '1').length)
    .then(console.log.bind(console,
      'with stats',
      s,
      s2,
      'testing',
      stances,
      ' -- ',
      stances[0],
      'for 1000 fights. Won:',
    ))
}

export function test () {
  // // test classes stance balance
  // testFight(['arcane', 'debuff'], 1)
  // testFight(['endure', 'berserk'], 1)
  // testFight(['poison', 'stealth'], 1)
  // testFight(['martial', 'buffer'], 1)
  // testFight(['sniper', 'trapper'], 1)
  // testFight(['support', 'breaker'], 1)
  //
  // testFight(['arcane', 'debuff'], 25)
  // testFight(['endure', 'berserk'], 25)
  // testFight(['poison', 'stealth'], 25)
  // testFight(['martial', 'buffer'], 25)
  // testFight(['sniper', 'trapper'], 25)
  // testFight(['support', 'breaker'], 25)
  //
  // testFight(['arcane', 'debuff'], 50)
  // testFight(['endure', 'berserk'], 50)
  // testFight(['poison', 'stealth'], 50)
  // testFight(['martial', 'buffer'], 50)
  // testFight(['sniper', 'trapper'], 50)
  // testFight(['support', 'breaker'], 50)
  //
  // testFight(['arcane', 'debuff'], 100)
  // testFight(['endure', 'berserk'], 100)
  // testFight(['poison', 'stealth'], 100)
  // testFight(['martial', 'buffer'], 100)
  // testFight(['sniper', 'trapper'], 100)
  // testFight(['support', 'breaker'], 100)
  //
  // // test stat discrepance
  // testFight(['arcane', 'arcane'], 100, 1)
  // testFight(['arcane', 'arcane'], 90, 10)
  // testFight(['arcane', 'arcane'], 80, 20)
  // testFight(['arcane', 'arcane'], 60, 40)
  // testFight(['arcane', 'arcane'], 50, 50)
  // testFight(['arcane', 'arcane'], 80, 70)
  // testFight(['arcane', 'arcane'], 80, 60)
  // testFight(['arcane', 'arcane'], 80, 50)
  // testFight(['arcane', 'arcane'], 80, 40)
  // testFight(['arcane', 'arcane'], 80, 30)
  // testFight(['arcane', 'arcane'], 90, 70)
  // testFight(['arcane', 'arcane'], 90, 60)
  // testFight(['arcane', 'arcane'], 90, 50)
  // testFight(['arcane', 'arcane'], 90, 40)
  // testFight(['arcane', 'arcane'], 90, 30)
  // testFight(['arcane', 'arcane'], 70, 60)
  // testFight(['arcane', 'arcane'], 70, 50)
  // testFight(['arcane', 'arcane'], 70, 40)
  // testFight(['arcane', 'arcane'], 70, 30)
  // testFight(['arcane', 'arcane'], 30, 10)
  // testFight(['arcane', 'arcane'], 30, 20)
  // testFight(['arcane', 'arcane'], 20, 5)
  // testFight(['arcane', 'arcane'], 30, 5)
  // testFight(['arcane', 'arcane'], 40, 5)
  // testFight(['arcane', 'arcane'], 50, 5)
  // testFight(['arcane', 'arcane'], 60, 5)
  // testFight(['arcane', 'arcane'], 70, 5)
}

function mergeFighter (a, b) {
  return ifElse(
    isArrayLike,
    always(undefined),
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
