import {
  equals,
  partial,
  identity,
  ifElse,
} from 'ramda'

export class HandlerError extends Error {
  constructor (msg, text) {
    super(text)
    this.msg = msg
    this.text = text
  }
}

export function reject (msg, text) {
  return Promise.reject(new HandlerError(msg, text))
}

export function rejectUndefined (msg, error) {
  return ifElse(
    equals(undefined),
    partial(reject, [msg, error]),
    identity,
  )
}

