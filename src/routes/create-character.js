const emoji = require('node-emoji')
const persistence = require('../persistence')
const { fromId } = persistence.player
const view = require('../views/classes-descriptions')

function handler (bot, msg, match) {
  const className = match[1].split(' ')[0]
  const player = fromId(msg.from.id)
  player.isUnregistered()
    .then(() => {
      checkClass(className)
    })
    .then(() => {
      bot.sendMessage(msg.chat.id, view[className])
    })
    .catch(() => {
      bot.sendMessage(msg.chat.id, view.error)
    })
}

function checkClass (className) {
  if (!view[className]) {
    throw new Error(`Class doesn't exist`)
  }
}

module.exports = {
  message: new RegExp(`${emoji.emoji.question} (.+)`),
  handler,
}
