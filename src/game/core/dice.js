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
    .then(flip(divide)(0x10000 / faces))
    .then(Math.floor)
    .then(add(1))
}

export function rollBatch (faces, meanings) {
  const rolls = times(partial(roll, [faces]), meanings.length)
  return Promise.all(rolls)
    .then(zipObj(meanings))
}

export function rollMany (faces, amount) {
  const rolls = times(partial(roll, [faces]), amount)
  return Promise.all(rolls)
}

