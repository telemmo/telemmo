const persistence = require('../persistence')
const { playerFromId } = persistence.player

function handler (bot, msg) {
  const player = playerFromId(msg.from.id)
  player.isRegistered()
    .then(() => {
      player.deleteCharacter()
      bot.sendMessage(msg.chat.id, 'Character deleted. See /start to make a new one.')
    })
    .catch((e) => {
      console.log(e)
      bot.sendMessage(msg.chat.id, 'Internal Error :(')
    })
}

module.exports = {
  message: /DELETE MY CHARACTER/,
  handler,
}
