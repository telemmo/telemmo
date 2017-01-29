import {
  merge,
} from 'ramda'

function view (_) {
  return _(':globe_with_meridians: Welcome to the overworld! :globe_with_meridians:\n\n')
}

function keyboard () {
  return [
    [':heavy_plus_sign: /up_strength', ':heavy_plus_sign: /up_constitution'],
    [':heavy_plus_sign: /up_reflex', ':heavy_plus_sign: /up_accuracy'],
    [':heavy_plus_sign: /up_flow'],
    [':arrows_counterclockwise: /reset_stats', ':arrow_left: /start'],
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

