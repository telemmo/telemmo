const TelegramBot = require('node-telegram-bot-api')
const routes = require('./routes')
const inlineRoutes = require('./routes/inline-routes')
const key = require('./key')
function startBot (key, config = { polling: true }) {
  return new TelegramBot(key, config)
}

const bot = startBot(key)

bot.on('message', (msg) => {
  console.log(msg)
})

bot.on('callback_query', (callbackQuery) => {
  console.log(callbackQuery)
  var callbackData = JSON.parse(callbackQuery.data)

  inlineRoutes.forEach(route => {
    if (callbackData.route === route.name) {
      route.handler(bot, callbackData.payload, callbackQuery)
    }
  })
})

routes.forEach((route) => {
  bot.onText(route.message, route.handler.bind(null, bot))
})



