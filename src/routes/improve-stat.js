const emoji = require('node-emoji')
const view = require('../views/improve-stat')
const persistence = require('../persistence')
const { playerFromId } = persistence.player

const statTranslate = {
  Strength: 'str',
  Agility: 'agi',
  Dexterity: 'dex',
  Vitality: 'vit',
  Inteligence: 'int',
  Luck: 'luk',
}

function handler (bot, msg, match) {
  const player = playerFromId(msg.from.id)
  const statName = statTranslate[match[1]]
  player.isRegistered()
    .then(() => checkStatName(statName))
    .then(() => {
      bot.sendMessage(msg.chat.id, view.message, view.keyboard(statName))
    })
    .catch((e) => {
      console.log(e)
      bot.sendMessage(msg.chat.id, view.error)
    })
}

module.exports = {
  message: new RegExp(emoji.emojify(':up: (.*)')),
  handler,
}

function checkStatName (statName) {
  if (!statName) {
    throw new Error('Invalid stat name')
  }
}
