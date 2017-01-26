import {
  partial,
  curry,
  __,
  nth,
  split,
  assoc,
  flatten,
  join,
  compose,
} from 'ramda'

import { rejectUndefined } from './errors'
import models from '../models'

function view (_, clas) {
  return compose(join(''), flatten)([
    `${clas.emoji} ${_(clas.name)} ${clas.emoji}\n\n`,
    _('*Stances* - _You can change them any time_\n\n'),
    clas.stances.map((id) => {
      const stance = models.stances.find(id)
      const e = stance.emoji
      return `${_(stance.name)} ${e} ${_(stance.description)}\n\n`
    }),
  ])
}

export default function call (dao, provider, _, msg) {
  const params = {
    to: msg.chat,
  }
  return Promise.resolve(msg.matches)
    .then(rejectUndefined(msg, _('No match')))
    .then(nth(1))
    .then(split(' '))
    .then(nth(0))
    .then(models.classes.find)
    .then(rejectUndefined(msg, _('Invalid class name')))
    .then(partial(view, [_]))
    .then(assoc('text', __, params))
}

