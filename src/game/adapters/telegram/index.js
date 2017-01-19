import {
  partial,
  merge,
  mergeWith,
  head,
  objOf,
} from 'ramda'

import routes from './routes'
import i18n from '../../i18n'

function handleError (provider, error) {
  return provider.send(error.msg.chat, error.text)
}

function normalizeMessage (dao, provider, msg) {
  const normal = {
    text: msg.text,
    provider: 'telegram',
    nick: msg.from.username,
    chat: msg.chat.id,
    user: msg.from.id,
    player: {
      language: 'en',
    },
  }

  return dao.player
    .find({ 'providers.telegram.id': normal.user })
    .then(head)
    .then(objOf('player'))
    .then(mergeWith(merge, normal))
}

function handle (dao, provider, route, msg) {
  const translate = partial(i18n, [msg.player.language])

  return route.handler(dao, provider, translate, msg)
    .then(() => console.log(`${msg.chat} OK  "${msg.text}"`))
    .catch(partial(handleError, [provider]))
    .catch(partial(console.error, [`${msg.chat} ERR "${msg.text}":`]))
}

export default function start (dao, provider) {
  return routes.map(route =>
    provider
      .subscribe(route.match)
      .flatMap(partial(normalizeMessage, [dao, provider]))
      .subscribe(partial(handle, [dao, provider, route])),
  )
}

