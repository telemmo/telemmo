import {
  repeat,
  zipObj,
  partial,
  map,
} from 'ramda'

import crypto from 'crypto'

export function d (faces) {
  return new Promise((resolve, reject) => {
    if (faces > 256) { reject('No more than 256 faces') }
    crypto.randomBytes(1, (err, buf) => {
      if (err) {
        reject()
      }
      resolve(
        Math.floor((buf[0]) / ((256) / faces)) + 1,
      )
    })
  })
}

export function rollBatch (faces, meanings) {
  const rolls = repeat(partial(d, [faces]), meanings.length)
  return Promise
    .all(rolls.map(p => p()))
    .then(partial(zipObj, [meanings]))
}

const testRolls = () => {
  var x = 0
  var y = 0
  repeat(
    () => d(20).then((r) => {
      x += r
      y += 1
      console.log(x / y, 'sould aim for 10.5')
    }),
    100000,
  ).map(r => r())
}


// COMBAT WIP VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
export const test = () => {
  // testRolls()
  
  rollBatch(20, ['team 1 initiative', 'team 2 initiative'])
    .then(console.log)

  Promise.all(
    repeat(
      () => rollBatch(20, ['skill', 'aim', 'hit']),
      100,
    ).map(r => r()),
  )
    .then(map(dices => {
      dices.reduce((state, dice, turn) => {
         
      })
    }))
}
