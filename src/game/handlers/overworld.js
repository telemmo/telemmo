import {
  merge,
} from 'ramda'

function view (_) {
  return _(':globe_with_meridians: Welcome to the overworld! :globe_with_meridians:\n\n')
}

function keyboard () {
  return [
    ['/maps'],
    ['/stats', '/equips'],
    ['/arena', '/market'],
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

