import {
  merge,
  map,
  mergeWith,
  add,
} from 'ramda'

import models from '../models'

export function combatStats ({ str, int, ref, acc, con, kno }) {
  const statPointRelevance = 5
  const sr = statPointRelevance
  return map(Math.floor, {
    atk: ((str / 2) + acc) / sr,
    def: ((str / 2) + ref) / sr,
    aim: ((int / 2) + acc) / sr,
    dod: ((int / 2) + ref) / sr,
    initialHp: 20 + (con / sr),
    flow: kno / sr,
    init: (str + con + int + kno) / sr,
  })
}

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
    .then(addStanceStats)
    .then(merge(combatStats(fighter)))
    .then(addEquipStats)
    .then(f => merge(f, { hp: f.initialHp }))
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

