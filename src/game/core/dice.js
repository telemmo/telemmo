import {
  flip,
  add,
  divide,
  invoker,
  times,
  zipObj,
  partial,
} from 'ramda'

import crypto from 'crypto'
import Promise from 'bluebird'

const randomBytes = Promise.promisify(crypto.randomBytes)

export function roll (faces) {
  return randomBytes(2)
    .then(invoker(0, 'readUInt16LE'))
    .then(flip(divide)(0xFFFF / faces))
    .then(add(1))
    .then(Math.floor)
}

export function rollBatch (faces, meanings) {
  const rolls = times(partial(roll, [faces]), meanings.length)
  return Promise.all(rolls)
    .then(zipObj(meanings))
}

// const testRolls = () => {
//   var x = 0
//   var y = 0
//   repeat(
//     () => roll(20).then((r) => {
//       x += r
//       y += 1
//       console.log(x / y, 'sould aim for 10.5')
//     }),
//     100000,
//   ).map(r => r())
// }

export const test = () => {
  // testRolls()
}
