import {
  partial,
  identity,
  ifElse,
  contains,
  __,
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
    contains(__, [null, undefined]),
    partial(reject, [msg, error]),
    identity,
  )
}

