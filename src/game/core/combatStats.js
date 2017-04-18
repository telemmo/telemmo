import {
  merge,
  mergeWith,
  add,
  keys,
  pipe,
} from 'ramda'

import models from '../models'

function addEquipStats (fighter) {
  if (!fighter.equips) { return fighter }
  return keys(fighter.equips)
    .reduce((acc, equipPosition) => {
      const equip = models.equips.find(fighter.equips[equipPosition])
      return mergeWith(add, acc, equip.bonus)
    }, fighter)
}

function addHp (fighter) {
  const { hp = 0, str, con, acc, ref, level } = fighter

  const initialHp = hp > 0 ? hp : ((str + con + acc + ref) / 4) + level + 50

  return merge(fighter, { initialHp, hp: initialHp })
}

export const buildCombatStats = pipe(
  addEquipStats,
  addHp,
)
