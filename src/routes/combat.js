const emoji = require('node-emoji')
const view = require('../views/combat')
const persistence = require('../persistence')
const { playerFromId } = persistence.player
const farming = require('../farming')
const { isValidMap } = require('../models/monsters')

function handler (bot, msg, match) {
  const map = match[1]
  if (!isValidMap(map)) {
    bot.sendMessage(msg.chat.id, 'Invalid Map')
    return
  }
  const player = playerFromId(msg.from.id)
  player.isRegistered().then(() => {
    player.get().then(player => {
      const className = player.character.className
      bot.sendMessage(
        msg.chat.id,
        view.message(map),
        view.keyboard(map, className)
      )
      farming.start(bot, map, msg)
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
