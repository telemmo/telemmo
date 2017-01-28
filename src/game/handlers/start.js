import {
  ifElse,
  splitEvery,
  partial,
  length,
  equals,
  always,
  pipe,
} from 'ramda'

import handlers from './index'

function createPlayer (dao, _, msg) {
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
  if (msg.player.id) {
    return dao.character.find({ playerId: msg.player.id })
      .then(ifElse(
        pipe(length, equals(0)),
        partial(handlers.welcome, [dao, provider, _, msg]),
        partial(handlers.overworld, [dao, provider, _, msg]),
      ))
  }

  return createPlayer(dao, _, msg)
    .then(partial(handlers.welcome, [dao, provider, _, msg]))
}

