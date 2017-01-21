import {
  merge,
  repeat,
  zipObj,
  partial,
} from 'ramda'

import crypto from 'crypto'

function buildCombatStats ({ str, int, ref, acc, con, kno }) {
  return {
    atk: str + acc,
    def: str + ref,
    matk: int + acc,
    mdef: int + ref,
    hp: con,
    flow: kno,
    init: str + con + int + kno,
  }
}

function d20 () {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(1, (err, buf) => {
      if (err) {
        reject()
      }
      resolve(Math.ceil((buf[0]) / (256 / 20)))
    })
  })
}

function combatStats (obj) {
  return merge(obj, buildCombatStats(obj))
}

function rollTurn () {
  return Promise.all(repeat(d20, 3)
    .map(p => p()))
    .then(partial(zipObj, [['initiative', 'aim', 'strength']]))
}

