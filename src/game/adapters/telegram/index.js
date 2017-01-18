import {
  partial,
  merge,
  head,
  objOf,
} from 'ramda'

import routes from './routes'

function normalizeMessage (dao, msg) {
  const normal = {
    text: msg.text,
    provider: {
      name: 'telegram',
      nick: msg.from.username,
      chat: msg.chat.id,
      user: msg.from.id,
    },
  }

  return dao.player
    .find({ 'providers.telegram.id': normal.fromId })
    .then(head)
    .then(objOf('player'))
    .then(merge(normal))
}

export default function start (dao, provider) {
  const subscriptions = routes.map(route =>
    provider
      .subscribe(route.match)
      .flatMap(partial(normalizeMessage, [dao]))
      .subscribe(partial(route.handler, [dao, provider])))

  return subscriptions
}

