import TelegramBot from 'node-telegram-bot-api'
import { Observable } from 'rx'

import {
  always,
  bind,
  partial,
} from 'ramda'

function buildFilter (stream, regex) {
  const match = new RegExp(regex)
  return stream.filter(msg => match.test(msg.text))
}

function sendMessage (bot, message, options) {
  bot.sendMessage(message, options)
  return Observable.of(false)
}

function start () {
  const token = process.env.BOT_KEY
  const bot = new TelegramBot(token, { polling: true })

  const stream = Observable.fromEvent(bot, 'message')

  if (process.env.NODE_ENV !== 'production') {
    stream.subscribe(console.log)
  }

  return bot.getMe()
    .then(always({
      stop: bind(bot.stopPolling, bot), // => Promise
      send: partial(sendMessage, [bot]), // => Stream
      subscribe: partial(buildFilter, [stream]), // => Stream
    }))
}

export default {
  start,
}
