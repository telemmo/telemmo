import {
  partial,
  nth,
} from 'ramda'

import { reject } from './errors'
import classes from '../models/classes'

export default function call (dao, provider, _, msg) {
  const className = nth(1, msg.matches)
  if (!className) {
    return reject(_('No class name'))
  }
  const clas = classes.find(className)
  if (!clas) {
    return reject(_('Invalid class name'))
  }

  const params = [
    msg.chat,
    _('%s information:\n\n%s', _(clas.name), clas.stances.join(' ')),
  ]

  return Promise.resolve()
    .then(partial(provider.send, params))
}

