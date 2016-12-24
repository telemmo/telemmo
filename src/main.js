const TelegramBot = require('node-telegram-bot-api')
const routes = require('./routes')
const key = require('./key')

function startBot (key, config = { polling: true }) {
  return new TelegramBot(key, config)
}

const bot = startBot(key)

bot.on('message', (msg) => {
  console.log(msg)
})

routes.forEach((route) => {
  bot.onText(route.message, route.handler.bind(null, bot))
})

