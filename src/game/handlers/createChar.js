import {
  partial,
  __,
  nth,
  assoc,
} from 'ramda'

import { reject, rejectUndefined } from './errors'
import factories from '../factories'
import handlers from './index'

function renderSuccess (_, char) {
  return _('*%s* created! Now using it!\n\n%s\n\n%s',
  char.name,
    _('_You can change character using /changename New Name_'),
    _('To change character, use /changechar'),
  )
}

function renderError (_, msg, err) {
  console.log('Failed creating char:', err)

  return {
    to: msg.chat,
    text: _('Failed creating character!'),
  }
}

export default function call (dao, provider, _, msg) {
  if (!msg.player.id) {
    return reject(msg, _('Funny, you should have a player first!'))
  }

  const params = {
    to: msg.chat,
  }

  return Promise.resolve(msg.matches)
    .then(rejectUndefined(msg, _('You need to choose a class')))
    .then(nth(1))
    .then(rejectUndefined(msg, _('Invalid class name')))
    .then(partial(factories.character.create, [msg.player.id]))
    .then(dao.character.create)
    .then(partial(renderSuccess, [_]))
    .then(assoc('text', __, params))
    .catch(partial(renderError, [_, msg]))
}

