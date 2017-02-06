import {
  partial,
  nth,
  split,
  merge,
  flatten,
  join,
  compose,
} from 'ramda'

import { rejectUndefined } from './errors'
import models from '../models'

function view (_, clas) {
  return compose(join(''), flatten)([
    `${clas.emoji} ${_(clas.name)} ${clas.emoji}\n\n`,
    _('<b>Stances</b> - <i>You can change them any time</i>\n\n'),
    clas.stances.map((id) => {
      const stance = models.stances.find(id)
      const e = stance.emoji
      return `${_(stance.name)} ${e} ${_(stance.description)}\n\n`
    }),
  ])
}

function keyboard (_, clas) {
  return [
    [`/create_${clas.id} ${clas.emoji}`],
    [':arrow_left: /new_char'],
  ]
}

function reply (_, clas) {
  return {
    text: view(_, clas),
    options: keyboard(_, clas),
  }
}

export default function call (dao, provider, _, msg) {
  const params = {
    to: msg.chat,
  }
  return Promise.resolve(msg.matches)
    .then(rejectUndefined(msg, _('No match')))
    .then(nth(1))
    .then(models.classes.find)
    .then(rejectUndefined(msg, _('Invalid class name')))
    .then(partial(reply, [_]))
    .then(merge(params))
}

