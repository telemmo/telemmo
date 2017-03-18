import cluster from 'cluster'

import emoji from 'node-emoji'
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

function sendMessage (bot, chat, message, options) {
  if (process.env.TELEMMO_QUIET) {
    return
  }
  bot.sendMessage(chat, emoji.emojify(message), options)
  return Observable.of(false)
}

function start () {
  const numWorkers = Number(process.env.HTTP_WORKERS)
  const token = process.env.BOT_KEY
  const domain = process.env.DOMAIN
  const options = {
    webHook: {
      port: process.env.NODE_PORT,
      key: process.env.SSL_KEY_PATH,
      cert: process.env.SSL_CERT_PATH,
    },
  }

  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)

    Array.from({ length: numWorkers }).forEach(() => {
      cluster.fork()
    })

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died`)
    })

    const bot = new TelegramBot(token)

    return bot.setWebHook(`${domain}:${options.webHook.port}/bot${token}`, {
      certificate: options.webHook.cert,
    })
      .then(bot.getMe.bind(bot))
      .then(always({
        send: partial(sendMessage, [bot]), // => Stream
        subscribe: () => Observable.empty(),
      }))
  }

  const bot = new TelegramBot(token, options)
  const stream = Observable.fromEvent(bot, 'message')

  if (process.env.NODE_ENV !== 'production') {
    stream.subscribe(console.log)
  }

  console.log(`Worker ${process.pid} started`)

  return bot.getMe()
    .then(always({
      send: partial(sendMessage, [bot]), // => Stream
      subscribe: partial(buildFilter, [stream]), // => Stream
    }))
}

export default {
  start,
}
