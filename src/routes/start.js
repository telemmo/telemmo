const view = require('../views/start')
const persistence = require('../persistence')
const { playerFromId } = persistence.player

function handler (bot, msg) {
  const player = playerFromId(msg.from.id)
  player.isUnregistered()
    .then(() => {
      bot.sendMessage(msg.chat.id, view.message, view.keyboard)
    })
    .catch((e) => {
      console.log(e)
      bot.sendMessage(msg.chat.id, view.error)
    })
}

module.exports = {
  message: /\/start/,
  handler,
}
