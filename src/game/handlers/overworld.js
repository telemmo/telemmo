import {
  merge,
} from 'ramda'

function view (_) {
  return _(':globe_with_meridians: Welcome to the overworld! :globe_with_meridians:\n\n')
}

function keyboard () {
  return [
    [':earth_asia: /maps :earth_asia:'],
    [':bar_chart: /stats :bar_chart:', ':ring: /equips :ring:'],
    [':no_entry_sign: /arena :space_invader:', ':no_entry_sign: /market :european_post_office:'],
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

