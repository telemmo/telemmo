import {
  add,
  values,
  always,
  prop,
  flatten,
  assoc,
  find,
  filter,
  mergeWith,
  ifElse,
  partial,
  isArrayLike,
  propEq,
  propOr,
  view,
  pipe,
  set,
  map,
  merge,
  lensPath,
  lensProp,
  reverse,
} from 'ramda'

import cuid from 'cuid'
import Promise from 'bluebird'
import { ObjectId } from 'mongodb'

import { buildCombatStats } from './combatStats'
import randomSkillFromStance from './randomSkillFromStance'
import { rollBatch } from './dice'
import { level } from './level'
import models from '../models'
import castSkill from './castSkill'

function runInitiative (teams, rolls) {
  const names = teams.map(team => team.overall.name)

  if (rolls[names[0]] === rolls[names[1]]) {
    return initiative(teams)
  }

  if (rolls[names[0]] > rolls[names[1]]) {
    return {
      order: [teams[0], teams[1]],
      rolls
    }
  }

  return {
    order: [teams[1], teams[0]],
    rolls
  }
}

function initiative (teams) {
  return rollBatch(20, [teams[0].overall.name, teams[1].overall.name])
    .then(partial(runInitiative, [teams]))
}

function attachPrizes (combat, rolls) {
  const { teams } = combat

  const allPrizes = teams[0].members.reduce((loot, char) => {
    return [...loot, ...teams[1].members.reduce((prizes, enemy) => {
      if (!enemy.prizes) {
        return prizes
      }

      prizes = [ ...prizes ,{
        charId: char.id,
        exp: enemy.prizes.exp,
      }]

      if (rolls.itemLuck < 2000 && enemy.prizes.items) {
        const items = enemy.prizes.items
        const index = Math.floor(((rolls.item - 1) / 10000) * items.length)

        prizes = [ ...prizes, {
          charId: char.id,
          item: enemy.prizes.items[index],
        }]
      }

      if (rolls.equipLuck < 150 && enemy.prizes.equips) {
        const equips = enemy.prizes.equips
        const index = Math.floor(((rolls.equip - 1 ) / 10000) * equips.length)

        prizes = [ ...prizes, {
          charId: char.id,
          equip: enemy.prizes.equips[index],
        }]
      }

      if (rolls.tokenLuck <= 5 && enemy.prizes.tokens) {
        const tokens = enemy.prizes.equips
        const index = Math.floor(((rolls.token - 1) / 10000) * tokens.length)

        prizes = [ ...prizes, {
          charId: char.id,
          equip: enemy.prizes.tokens[index],
        }]
      }

      return prizes
    }, [])]
  }, [])

  return set(lensProp('prizes'), allPrizes, combat)
}


function markFinished (combat) {
  return pipe(
    set(lensProp('finishedAt'), new Date()),
    set(lensProp('winners'), combat.teams[0].members.map(prop('id'))),
  )(combat)
}


const prizesRolls = [
  'itemLuck', 'item',
  'equipLuck', 'equip',
  'tokenLuck', 'token',
]

function finish (combat) {
  return rollBatch(10000, prizesRolls)
    .then(partial(attachPrizes, [combat]))
    .then(markFinished)
}

function runTurn (combat, rolls) {
  const { teams } = combat
  const attacker = teams[0].overall
  const defender = teams[1].overall

  const skill = (rolls.aSkill * (attacker.flow / 4))
              - (rolls.dSkill * (defender.flow / 6))

  const aim = (rolls.aAim * (attacker.acc / 4))
            - (rolls.dAim * (defender.ref / 6))

  const hit = (((rolls.aHit / 4) * (attacker.str / 4)) + 5)
            - ((rolls.dHit / 4) * (defender.con / 6))

  let dmg = Math.max(
    Math.ceil(hit),
    2,
  )

  if (aim < -20) {
    dmg = 0
  }

  const defenderHp = lensPath(['teams', 1, 'overall', 'hp'])

  combat = set(defenderHp, view(defenderHp, combat) - dmg, combat)

  let casts = []

  if (skill > 0) {
    teams[0].members.forEach((member) => {
      if (!member.stance) { return }
      const randomSkill = randomSkillFromStance(member.stance)
      const afterCast = castSkill(randomSkill, combat, rolls, member)
      if (!afterCast) { return }
      combat = afterCast.combat
      casts = casts.concat([afterCast.cast])
    })
  }

  teams[0].members.forEach((member) => {
    values(member.equips).forEach((name) => {
      const equip = models.equips.find(name)
      if (!equip.fire) {
        return
      }
      const afterCast = castSkill(equip, combat, rolls, member)
      if (!afterCast) { return }
      combat = afterCast.combat
      casts = casts.concat([afterCast.cast])
    })
  })

  const newTurn = {
    attacker: combat.teams[0].overall.name,
    defender: combat.teams[1].overall.name,
    damage: dmg,
    defenderHp: {
      current: view(defenderHp, combat),
      init: combat.teams[1].overall.initialHp,
    },
    rolls,
    casts,
  }

  combat = merge(combat, {
    turns: [...combat.turns, newTurn],
  })

  if (view(defenderHp, combat) <= 0) {
    return finish(combat)
  }


  combat = merge(combat, {
    teams: reverse(combat.teams),
  })

  if (combat === null) {
    debugger
  }

  return combat
}

const turnRolls = ['aSkill', 'aAim', 'aHit', 'dSkill', 'dAim', 'dHit']

function turn (combat) {
  return rollBatch(20, turnRolls)
    .then(partial(runTurn, [combat]))
}

const teamsMemberIds = pipe(
  flatten,
  map(prop('id')),
  filter(ObjectId.isValid),
  map(ObjectId),
)

const combatMemberIds = pipe(
  prop('teams'),
  map(prop('members')),
  teamsMemberIds,
)

function wait (combat) {
  const amount = process.env.NODE_ENV === 'production'
    ? 40000 + (Math.random() * 30000)
    : 3141 + (Math.random() * 2000)

  return Promise.delay(amount)
    .then(always(combat))
}

function mergeLevel (teams, computedExps) {
  return teams.map(team =>
    team.map(char => {
      if (char.prizes) { return char }
      const charExp = pipe(find(propEq('_id', char.id)), propOr(0, 'exp'))
      const exp = charExp(computedExps)
      return merge(char, { exp, level: level({ exp }) })
    }))
}

function addLevel (dao, teams) {
  const members = teamsMemberIds(teams)

  return dao.combat.aggregate([
    { $match: { winners: { $in: members } } },
    { $project: { prizes: 1 } },
    { $unwind: '$prizes' },
    { $project: { exp: '$prizes.exp', charId: '$prizes.charId' } },
    { $group: { _id: '$charId', exp: { $sum: '$exp' } } },
  ])
    .then(partial(mergeLevel, [teams]))
}

function updateCombat (dao, combat) {
  const query = {
    token: combat.token,
  }

  return dao.combat.update(query, combat)
}

function upsertCombat (dao, combat) {
  let query = {
    'teams.members': {
      $elemMatch: {
        id: { $in: combatMemberIds(combat) },
      },
    },
  }

  if (combat.id) {
    query = merge(query, { _id: combat.id })
  }

  if (!combat.finishedAt) {
    query = merge(query, {
      finishedAt: { $exists: false },
    })
  }

  return dao.combat.update(query, combat, { upsert: true })
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

function build (dao, source, tms) {
  return Promise.resolve(tms)
    .then(partial(addLevel, [dao]))
    .then(teams =>
      Promise.all(teams.map(team =>
        Promise.all(team.map(buildCombatStats)))),
    )
    .then(map(buildTeam))
    .then(initiative)
    .then(initTurn => ({
      teams: initTurn.order,
      initialTeams: initTurn.order,
      startedAt: new Date(),
      turns: [
        {
          winner: initTurn.order[0].overall.name,
          rolls: initTurn.rolls,
        },
      ],
    }))
    .then(assoc('token', cuid()))
    .then(assoc('source', source))
    .then(partial(upsertCombat, [dao]))
    .then(wait)
}

export function start (combat) {
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

export function run (dao, source, teams) {
  return build(dao, source, teams)
    .then(start)
    .then(partial(updateCombat, [dao]))
}

