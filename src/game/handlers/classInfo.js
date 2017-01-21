import {
  partial,
  curry,
  __,
  nth,
  split,
} from 'ramda'

import { rejectUndefined } from './errors'
import models from '../models'

function view (_, clas) {
  return _(
    '%s%s%s\n\n%s',
    clas.emoji,
    _(clas.name),
    clas.emoji,
    '*Stances* - _You can change them any time_\n\n' + clas.stances
      .map((name) => {
        const stance = models.stances.find(name)
        const e = stance.emoji
        return `${stance.name} ${e} ${stance.description}\n\n`
      })
      .join(''),
  )
}

export default function call (dao, provider, _, msg) {
  return Promise.resolve(msg.matches)
    .then(rejectUndefined(msg, _('No match')))
    .then(nth(1))
    .then(split(' '))
    .then(nth(0))
    .then(models.classes.find)
    .then(rejectUndefined(msg, _('Invalid class name')))
    .then(partial(view, [_]))
    .then(curry(provider.send)(msg.chat, __, { parse_mode: 'markdown' }))
}

