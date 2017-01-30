import {
  partial,
  __,
  nth,
  assoc,
  always,
} from 'ramda'

import { reject, rejectUndefined } from './errors'
import factories from '../factories'

function renderSuccess (_, char) {
  return _(
    '<b>%s</b> created! This is your current character now.\n\nYou can change your name using /change_name \n\nTo change character, use /change_char ',
    char.name,
  )
}

function renderError (_, msg, err) {
  console.log('Failed creating char:', err)

  return {
    to: msg.chat,
    text: _('Failed creating character!'),
  }
}

function addCharToPlayer (dao, player, char) {
  return dao.character.create(char)
    .then(newChar => dao.player.update(
      { _id: player.id },
      { $set: { currentCharId: newChar.id } },
    ))
    .then(always(char))
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
    .then(partial(addCharToPlayer, [dao, msg.player]))
    .then(partial(renderSuccess, [_]))
    .then(assoc('text', __, params))
    .catch(partial(renderError, [_, msg]))
}

