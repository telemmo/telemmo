import {
  partial,
  splitEvery,
  map,
  pipe,
  toLower,
} from 'ramda'
import { emojify } from 'node-emoji'
import { reject } from './errors'
import models from '../models'

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

const buildKeyboard = pipe(
  map((clas) => {
    const e = emojify(clas.emoji)
    return `${e} /info_${clas.id} ${e}`
  }),
  splitEvery(1),
)

export default function call (dao, provider, _, msg) {
  const params = [
    msg.chat,
    _(':globe_with_meridians: Welcome to TeleMMO! :globe_with_meridians:\n\n You will now create your first character. Touch the comands below to see information about a class.'),
    {
      reply_markup: {
        keyboard: buildKeyboard(models.classes.all),
      },
    },
  ]

  return createPlayer(dao, _, msg)
    .then(partial(provider.send, params))
}

