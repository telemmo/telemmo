import cluster from 'cluster'

import emoji from 'node-emoji'
import TelegramBot from 'node-telegram-bot-api'
import { Observable } from 'rx'

import {
  always,
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
}

function start () {
  const {
    BOT_KEY: token,
    DOMAIN: domain,
    NODE_PORT: port,
    SSL_KEY_PATH: key,
    SSL_CERT_PATH: cert,
    HTTP_WORKERS: numWorkers,
  } = process.env

  let options = {
    polling: true,
  }

  if (domain) {
    options = {
      webHook: {
        port,
        key,
        cert,
      },
    }
  }

  if (numWorkers && cluster.isMaster) {
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
