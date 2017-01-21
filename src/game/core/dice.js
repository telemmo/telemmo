import {
  repeat,
  zipObj,
  partial,
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

export function rollTurn (meanings) {
  const rolls = repeat(partial(d, [20]), meanings.length)
  return Promise
    .all(rolls.map(p => p()))
    .then(partial(zipObj, [meanings]))
}

export const test = () => {
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
