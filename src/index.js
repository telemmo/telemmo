import TelegramBot from 'node-telegram-bot-api'
import game from './game'

const token = process.env.BOT_KEY
const bot = new TelegramBot(token, { polling: true })

bot.on('message', function (msg) {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, 'hallo')
})
