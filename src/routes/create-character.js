const emoji = require('node-emoji')
const persistence = require('../persistence')
const { fromId } = persistence.player
const view = require('../views/classes-descriptions')
const { classFromName } = require('../models/character')

function handler (bot, msg, match) {
  const className = match[1].split(' ')[0]
  const player = fromId(msg.from.id)
  player.isUnregistered()
    .then(() => {
      checkClass(className)
    })
    .then(() => {
      bot.sendMessage(msg.chat.id, view.buildMessage(className), {parse_mode: 'Markdown'})
    })
    .catch((e) => {
      console.log(e)
      bot.sendMessage(msg.chat.id, view.error)
    })
}

function checkClass (className) {
  if (!classFromName(className)) {
    throw new Error(`Class doesn't exist`)
  }
}

module.exports = {
  message: new RegExp(`${emoji.emoji.question} (.+)`),
  handler,
}
