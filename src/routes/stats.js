const view = require('../views/stats')
const persistence = require('../persistence')
const { playerFromId } = persistence.player

function handler (bot, msg) {
  const player = playerFromId(msg.from.id)
  player.isRegistered()
    .then(() => {
      player.get()
        .then((player) => {
          bot.sendMessage(msg.chat.id, view.message(player))
        })
    })
    .catch((e) => {
      console.log(e)
      bot.sendMessage(msg.chat.id, view.error)
    })
}

module.exports = {
  message: /My Stats .*/,
  handler,
}
