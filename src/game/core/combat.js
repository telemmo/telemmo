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

const overallInit = lensPath(['overall', 'init'])

function runInitiative (teams, rolls) {
  const team0name = teams[0].overall.name
  const team1name = teams[1].overall.name

  const teamsInit = mergeWith(add, rolls, {
    [team0name]: view(overallInit, teams[0]),
    [team1name]: view(overallInit, teams[1]),
  })

  if (teamsInit[team0name] === teamsInit[team1name]) {
    return initiative(teams)
  }

  if (teamsInit[team0name] > teamsInit[team1name]) {
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

  const statPointRelevance = 10
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
    defenderHp: combat.teams[1].overall.hp,
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

function testFight (stances, s, s2) {
  s2 = s2 || s
  const teams = [
    [{ name: 'Worms', stance: stances[0], str: s, int: s, ref: s, acc: s, con: s, kno: s, equips: { weapon: 'poison_dagger'} }],
    // [{ name: '2', stance: stances[1], str: s, int: s, ref: s, acc: s, con: s, kno: s, equips: {} }],
    [models.monsters.find(stances[1])],
  ]


  Promise.all(Array.from({ length: 1 })
    .map(() => build(teams).then(start)))
    .then(combats => combats.map((c) => { console.log(viewCombat(c, 'Worms')); return c }))
    .then(cs => cs.filter(c => c.winner === 'Worms').length)
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
  testFight(['arcane', 'snake'], 8)
  // testFight(['arcane', 'bird'], 5)
  // testFight(['arcane', 'goat'], 5)
  // testFight(['arcane', 'snake'], 5)
  // testFight(['arcane', 'spider'], 5)
  //
  // testFight(['arcane', 'rat'], 10)
  // testFight(['arcane', 'bird'], 10)
  // testFight(['arcane', 'goat'], 10)
  // testFight(['arcane', 'snake'], 10)
  // testFight(['arcane', 'spider'], 10)
  //
  //
  // testFight(['arcane', 'rat'], 15)
  // testFight(['arcane', 'bird'], 15)
  // testFight(['arcane', 'goat'], 15)
  // testFight(['arcane', 'snake'], 15)
  // testFight(['arcane', 'spider'], 15)
  //
  //
  // testFight(['arcane', 'rat'], 20)
  // testFight(['arcane', 'bird'], 20)
  // testFight(['arcane', 'goat'], 20)
  // testFight(['arcane', 'snake'], 20)
  // testFight(['arcane', 'spider'], 20)
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
  const obj =  {
    overall: members.reduce((acc, fighter) => {
      return mergeWith(mergeFighter, acc, fighter)
    },
      { stance: [] }),
    members,
  }
  return obj
}
