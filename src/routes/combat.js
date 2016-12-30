const emoji = require('node-emoji')
const view = require('../views/combat')
const persistence = require('../persistence')
const { playerFromId } = persistence.player

function handler (bot, msg, match) {
  const map = match[1]
  const player = playerFromId(msg.from.id)
  player.isRegistered()
    .then(() => {
      player.get()
        .then((player) => {
          const className = player[0].character.className
          bot.sendMessage(
            msg.chat.id,
            view.message(map),
            view.keyboard(className)
          )
        })
    })
    .catch((e) => {
      console.log(e)
      bot.sendMessage(msg.chat.id, view.error, view.errorKeyboard)
    })
}

module.exports = {
  message: new RegExp(emoji.emojify(':boom: (.*)')),
  handler,
}
