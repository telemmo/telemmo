import {
  partial,
  merge,
  mergeWith,
  head,
  objOf,
} from 'ramda'

import emoji from 'node-emoji'
import routes from './routes'
import tasks from '../../tasks'
import i18n from '../../i18n'

function handleError (provider, error) {
  if (error.msg) {
    return provider.send(error.msg.chat, error.text)
  }

  console.error('An error returned something not sendable')
  console.error(error)
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
  let telegramOptions = {
    parse_mode: 'markdown',
  }

  if (options) {
    telegramOptions = merge({
      reply_markup: {
        keyboard: options.map(row => row.map(emoji.emojify)),
      },
    }, options)
  }

  return provider.send(to, text, telegramOptions)
}

function handle (dao, provider, route, msg) {
  const translate = i18n.singular(msg.player.language)

  return route.handler(dao, provider, translate, msg)
    .then(partial(dispatch, [provider]))
    .then(() => console.log(`${msg.chat} OK  "${msg.text}"`))
    .then(() => {
      if (typeof route.next === 'function') {
        return route.next(dao, provider, translate, msg)
          .then(partial(dispatch, [provider]))
      }
    })
    .catch(partial(handleError, [provider]))
    .catch(partial(console.error, [`${msg.chat} ERR "${msg.text}":`]))
}


export default function start (dao, provider) {
  return Promise.all([
    ...tasks.map(task =>
      task(dao, partial(dispatch, [provider]))),
    ...routes.map(route => provider
      .subscribe(route.match)
      .flatMap(partial(normalizeMessage, [dao, provider, route]))
      .subscribe(partial(handle, [dao, provider, route])),
    ),
  ])
}

