import {
  add,
  values,
  always,
  mergeWith,
  ifElse,
  partial,
  isArrayLike,
  view,
  pipe,
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
import models from '../models'
import { viewCombat } from './combatView'
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

  const allPrizes = teams[0].members.reduce((loot, player) => {
    return [...loot, ...teams[1].members.reduce((prizes, enemy) => {
      if (!enemy.prizes) {
        return prizes
      }

      prizes = [ ...prizes ,{
        owner: player.name,
        exp: enemy.prizes.exp,
      }]

      if (rolls.itemLuck < 2000 && enemy.prizes.items) {
        const items = enemy.prizes.items
        const index = Math.floor((rolls.item / 10000) * items.length)

        prizes = [ ...prizes, {
          owner: player.name,
          item: enemy.prizes.items[index],
        }]
      }

      if (rolls.equipLuck < 50 && enemy.prizes.equips) {
        const equips = enemy.prizes.equips
        const index = Math.floor((rolls.equip / 10000) * equips.length)

        prizes = [ ...prizes, {
          owner: player.name,
          equip: enemy.prizes.equips[index],
        }]
      }

      if (rolls.tokenLuck <= 1 && enemy.prizes.tokens) {
        const tokens = enemy.prizes.equips
        const index = Math.floor((rolls.token / 10000) * tokens.length)

        prizes = [ ...prizes, {
          owner: player.name,
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
    set(lensProp('winner'), combat.teams[0].members[0].name),
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

  const statIrrelevance = 10
  const si = statIrrelevance

  const skill = (rolls.aSkill * (attacker.flow / si))
              - (rolls.dSkill * (defender.flow / si))

  const aim = (rolls.aAim * (attacker.acc / (si * 6)))
            - (rolls.dAim * (defender.ref / (si * 6)))

  const hit = ((rolls.aHit / 2) * (attacker.str / si))
            - ((rolls.dHit / 2) * (defender.con / si))

  let dmg = Math.max(
    Math.ceil(hit),
    1,
  )

  if (rolls.aAim === 1 || aim < -5) {
    dmg = 0
  }

  const defenderHp = lensPath(['teams', 1, 'overall', 'hp'])

  if (hit > 0) {
    combat = set(defenderHp, view(defenderHp, combat) - dmg, combat)
  }

  let casts = []

  if (skill > 0) {
    teams[0].members.forEach((member) => {
      if (!member.stance) { return }
      const randomSkill = randomSkillFromStance(member.stance)
      const afterCast = castSkill(randomSkill, combat, rolls)
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
      const afterCast = castSkill(equip, combat, rolls)
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
      current: combat.teams[1].overall.hp,
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

const turnRolls = ['aSkill', 'aAim', 'aHit', 'dSkill', 'sAim', 'dHit']

function turn (combat) {
  return rollBatch(20, turnRolls)
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
    .then(initTurn => ({
      teams: initTurn.order,
      initialTeams: initTurn.order,
      startedAt: new Date(),
      turns: [
        { winner: initTurn.order[0].overall.name, rolls: initTurn.rolls },
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

export function combat (teams) {
  return build(teams)
    .then(start)
}

function mergeFighter (a, b) {
  return ifElse(
    isArrayLike,
    always(undefined),
    add(b),
  )(a)
}

function buildTeam (members) {
  const obj =  {
    overall: members.reduce((acc, fighter) => {
      return mergeWith(mergeFighter, acc, fighter)
    },
      { stance: [] }),
    members,
  }
  return obj
}
