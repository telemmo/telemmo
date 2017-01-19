import {
  partial,
} from 'ramda'

import { reject } from './errors'

function createPlayer (dao, _, msg) {
  if (msg.player._id) {
    return reject(msg, _('Player already exists!'))
  }

  const player = {
    language: 'en',
    providers: {
      [msg.provider]: {
        id: msg.user,
      },
    },
  }

  return dao.player.create(player)
}

export default function call (dao, provider, _, msg) {
  const params = [
    msg.chat,
    _('Welcome to TeleMMO! You will now create your first character.'
    + 'Touch the comands below to see information about a class.'),
    {
      reply_markup: {
        keyboard: [
          ['/info-mage', '/info-fighter'],
          ['/info-thief', '/info-ranger'],
          ['/info-merchant', '/info-acolyte'],
        ],
      },
    },
  ]

  return createPlayer(dao, _, msg)
    .then(partial(provider.send, params))
}

