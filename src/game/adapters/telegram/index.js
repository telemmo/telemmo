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

function normalizeMessage (dao, provider, route, msg) {
  const normal = {
    text: msg.text,
    matches: msg.text.match(route.match),
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

function dispatch (provider, reply) {
  const { to, text, options } = reply
  const telegramOptions = {
    parse_mode: 'markdown',
    reply_markup: {
      keyboard: options,
    },
  }
  return provider.send(to, text, telegramOptions)
}

function handle (dao, provider, route, msg) {
  const translate = i18n.singular(msg.player.language)

  return route.handler(dao, provider, translate, msg)
    .then(partial(dispatch, [provider]))
    .then(() => console.log(`${msg.chat} OK  "${msg.text}"`))
    .catch(partial(handleError, [provider]))
    .catch(partial(console.error, [`${msg.chat} ERR "${msg.text}":`]))
}

export default function start (dao, provider) {
  return routes.map(route =>
    provider
      .subscribe(route.match)
      .flatMap(partial(normalizeMessage, [dao, provider, route]))
      .subscribe(partial(handle, [dao, provider, route])),
  )
}

