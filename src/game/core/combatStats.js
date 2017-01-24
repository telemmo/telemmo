import {
  merge,
  partial,
  map,
} from 'ramda'

export function combatStats ({ str, int, ref, acc, con, kno }) {
  return map(Math.floor, {
    atk: str/2 + acc,
    def: str/2 + ref,
    aim: int/2 + acc,
    dod: int/2 + ref,
    initialHp: con,
    flow: kno,
    init: str + con + int + kno,
  })
}

export function buildCombatStats (fighter) {
  return Promise.resolve(fighter)
    .then(merge(combatStats(fighter)))
    .then(fighter => merge(fighter, { hp: fighter.initialHp }))
}

function testBuild (s) {
  console.log(
    s + ': ',
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

