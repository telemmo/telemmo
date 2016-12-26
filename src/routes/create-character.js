const emoji = require('node-emoji')
const view = require('../views/classes-descriptions')
const persistence = require('../persistence')
const { playerFromId } = persistence.player
const { classFromName } = require('../models/classes')

function handler (bot, msg, match) {
  const className = match[1].split(' ')[0]
  const player = playerFromId(msg.from.id)
  player.isUnregistered()
    .then(() => {
      checkClass(className)
    })
    .then(() => {
      bot.sendMessage(msg.chat.id, view.buildMessage(className), view.buildOptions(className))
    })
    .catch((e) => {
      console.log(e)
      bot.sendMessage(msg.chat.id, view.error(e))
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
