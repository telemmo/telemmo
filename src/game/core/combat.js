import {
  merge,
  partial,
} from 'ramda'


export function combatStats ({ str, int, ref, acc, con, kno }) {
  return {
    atk: str + acc,
    def: str + ref,
    matk: int + acc,
    mdef: int + ref,
    initialHp: con,
    flow: kno,
    init: str + con + int + kno,
  }
}

export function buildCombatStats (fighter) {
  return Promise.resolve(fighter)
    .then(partial(merge, [combatStats(fighter)]))
    .then(all => merge(all, { hp: all.initialHp }))
}

function testBuild (s) {
  console.log(
    s + ': ',
    combatStats({ str:s, int:s, ref:s, acc:s, con:s, kno:s }),
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

