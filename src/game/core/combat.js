import {
  add,
  values,
  always,
  length,
  equals,
  prop,
  flatten,
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
        const index = Math.floor((rolls.item / 10000) * items.length)

        prizes = [ ...prizes, {
          charId: char.id,
          item: enemy.prizes.items[index],
        }]
      }

      if (rolls.equipLuck < 50 && enemy.prizes.equips) {
        const equips = enemy.prizes.equips
        const index = Math.floor((rolls.equip / 10000) * equips.length)

        prizes = [ ...prizes, {
          charId: char.id,
          equip: enemy.prizes.equips[index],
        }]
      }

      if (rolls.tokenLuck <= 1 && enemy.prizes.tokens) {
        const tokens = enemy.prizes.equips
        const index = Math.floor((rolls.token / 10000) * tokens.length)

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
    set(lensProp('winner'), combat.teams[0].members[0].id),
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

  const statIrrelevance = 6
  const si = statIrrelevance

  const skill = (rolls.aSkill * (attacker.flow / si))
              - (rolls.dSkill * (defender.flow / si))

  const aim = (rolls.aAim * (attacker.acc / (si * 6)))
            - (rolls.dAim * (defender.ref / (si * 6)))

  const hit = (((rolls.aHit / 4) * (attacker.str / si)) + 10)
            - ((rolls.dHit / 4) * (defender.con / si))

  let dmg = Math.max(
    Math.ceil(hit),
    2,
  )

  if (rolls.aAim === 1 || aim < -100) {
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

  return combat
}

const turnRolls = ['aSkill', 'aAim', 'aHit', 'dSkill', 'dAim', 'dHit']

function turn (combat) {
  return rollBatch(20, turnRolls)
    .then(partial(runTurn, [combat]))
}

function findPendingCombats (dao, teams) {
  return dao.combat.find({
    'teams.members': {
      $elemMatch: {
        id: { $in: map(prop('id'), flatten(teams)) },
      },
    },
    finishedAt: {
      $exists: false,
    },
  })
}

function wait (combat) {
  return Promise.delay(10000)
    .then(always(combat))
}

const memberIds = pipe(
  flatten,
  filter(pipe(prop('id'), ObjectId.isValid)),
  map(prop('id')),
)

function mergeLevel (teams, computedExps) {
  return teams.map(team =>
    team.map(char => {
      if (char.prizes) { return char }
      const charExp = pipe(find(propEq('_id', char.id)), propOr('exp', 0))
      const exp = charExp(computedExps)

      return merge(char, { exp, level: level(exp) })
    }))
}

function addLevel (dao, teams) {
  const members = memberIds(teams)

  return dao.combat.aggregate([
    { $match: { winner: { $in: members } } },
    { $project: { prizes: 1 } },
    { $unwind: '$prizes' },
    { $project: { exp: '$prizes.exp' } },
    { $group: { _id: '$charIdId', exp: { $sum: '$exp' } } },
  ])
    .then(partial(mergeLevel, [teams]))
}

function build (dao, tms) {
  return Promise.resolve(tms)
    .then(partial(addLevel, [dao]))
    .then((teams) => {
      return Promise.all(teams.map(team =>
        Promise.all(team.map(buildCombatStats))))
    })
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
    .then(dao.combat.create)
    .then(wait)
}

export function AlreadyOnCombat (combats) {
  this.message = `${combats.length} combats pending`
  this.name = 'AlreadyOnCombat'
  this.combats = combats
  Error.captureStackTrace(this, AlreadyOnCombat)
}
AlreadyOnCombat.prototype = Object.create(Error.prototype)
AlreadyOnCombat.prototype.constructor = AlreadyOnCombat

function buildCombat (dao, tms) {
  return findPendingCombats(dao, tms)
    .then(ifElse(
      pipe(length, equals(0)),
      partial(build, [dao, tms]),
      combats => Promise.reject(new AlreadyOnCombat(combats)),
    ))
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

export function run (dao, teams) {
  return buildCombat(dao, teams)
    .then(start)
    .then(combat => dao.combat.update({ _id: combat.id }, combat))
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
