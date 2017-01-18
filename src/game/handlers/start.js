import {
  partial,
} from 'ramda'

export default function start (dao, provider, msg) {
  console.log(msg)

  if (!msg.player) {
    const player = {
      providers: {
        [msg.provider.name]: {
          id: msg.fromId,
        },
      },
    }
    return dao.player.create(player)
      .then(partial(provider.send, [msg.provider.chat, 'Player created!']))
  }

  return provider.send(msg.provider.chat, `Hi ${msg.provider.nick}`)
}

