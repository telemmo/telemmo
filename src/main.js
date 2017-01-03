const TelegramBot = require('node-telegram-bot-api')
const routes = require('./routes')
const inlineRoutes = require('./routes/inline-routes')
const key = require('./key')
const logs = require('./logs.js')
function startBot (key, config = { polling: true }) {
  return new TelegramBot(key, config)
}

const bot = startBot(key)

logs.listenMessages(bot)

bot.on('callback_query', (payload) => {
  var callbackData
  try {
    callbackData = JSON.parse(payload.data)
  }
  catch (e) {
    return
  }
  const first_name = payload.from.first_name
  logs.registerLog(first_name, payload)
  inlineRoutes.forEach(route => {
    if (callbackData.route === route.name) {
      route.handler(bot, callbackData.payload, payload)
    }
  })
})

routes.forEach((route) => {
  bot.onText(route.message, route.handler.bind(null, bot))
})

