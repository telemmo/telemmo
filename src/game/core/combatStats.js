import {
  merge,
  map,
  mergeWith,
  add,
} from 'ramda'

import models from '../models'

function addStanceStats (fighter) {
  if (!fighter.stance) { return fighter }
  const stance = models.stances.find(fighter.stance)
  return mergeWith(add, fighter, stance.bonus)
}

function addEquipStats (fighter) {
  if (!fighter.equips) { return fighter }
  return Object.keys(fighter.equips).reduce((acc, equipPosition) => {
    const equip = models.equips.find(fighter.equips[equipPosition])
    return mergeWith(add, acc, equip.bonus)
  }, fighter)
}


export function buildCombatStats (fighter) {
  return Promise.resolve(fighter)
    .then(addEquipStats)
    .then(f => {
      const initialHp = 10 + (f.str + f.con + f.acc + f.ref)/4
      return merge(f, { initialHp, hp: initialHp })
    })
}

function testBuild (s) {
  console.log(
    s,
    ':',
    combatStats({ str: s, int: s, ref: s, acc: s, con: s, kno: s }),
    '\n-----',
  )
}

export function test () {
  testBuild(1)
  testBuild(10)
  testBuild(25)
  testBuild(50)
  testBuild(75)
  testBuild(100)
}

