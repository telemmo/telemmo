import {
  values,
  partial,
  view,
  set,
  merge,
  lensPath,
  reverse,
} from 'ramda'

import models from '../../models'
import { rollBatch } from '../dice'
import castSkill from './castSkill'
import randomSkillFromStance from './randomSkillFromStance'

function turn (combat, finish, rolls) {
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
    Math.ceil((3 * hit + (aim / 4)) / 4),
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

  return combat
}

const turnRolls = ['aSkill', 'aAim', 'aHit', 'dSkill', 'dAim', 'dHit']

export default function (combat, finish) {
  return rollBatch(20, turnRolls)
    .then(partial(turn, [combat, finish]))
}
