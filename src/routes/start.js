const view = require('../views/start')
const persistence = require('../persistence')
const { fromId } = persistence.player

function handler (bot, msg) {
  const player = fromId(msg.from.id)
  player.isUnregistered()
    .then(() => {
      bot.sendMessage(msg.chat.id, view.message, view.keyboard)
    })
    .catch(() => {
      bot.sendMessage(msg.chat.id, view.error)
    })
}

module.exports = {
  message: /\/start/,
  handler,
}
