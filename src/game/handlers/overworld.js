import {
  merge,
} from 'ramda'

function view (_) {
  return [
    _(':globe_with_meridians: Welcome to the overworld! :globe_with_meridians:'),
    _('\nOur telegram group is @telemmo, join and chat with us!'),
  ].join('\n')
}

function keyboard () {
  return [
    [':information_source: /char_info', ':earth_asia: /maps'],
    [':bar_chart: /improve_stats', ':card_file_box: /inventory'],
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

