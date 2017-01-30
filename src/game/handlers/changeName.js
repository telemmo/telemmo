import {
  always,
} from 'ramda'

import { reject } from './errors'

export default function call (dao, provider, _, msg) {
  const newName = msg.matches[1]

  if (newName.length > 25) {
    return reject(msg, _('That name is too long!'))
  }

  const params = {
    to: msg.chat,
    text: _(
      'You are now <b>%s</b>',
      newName,
    ),
  }

  return dao.character.update(
    { _id: msg.player.currentCharId },
    { $set: { name: newName } },
  ).then(always(params))
}

