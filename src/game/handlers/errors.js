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
