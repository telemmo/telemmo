import {
  merge,
} from 'ramda'

function view (_) {
  return _(':globe_with_meridians: Welcome to the overworld! :globe_with_meridians:\n\n')
}

function keyboard () {
  return [
    ['/up_strength', '/up_constitution'],
    ['/up_reflex', '/up_accuracy'],
    ['/up_flow', '/start'],
  ]
}

function reply (_) {
  return {
    text: view(_),
    options: keyboard(_),
  }
}

export default function call (dao, provider, _, msg) {
  const params = {
    to: msg.chat,
  }
  return Promise.resolve(merge(params, reply(_)))
}

