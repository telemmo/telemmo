const view = require('../../views/character-created')
const persistence = require('../../persistence')
const { classFromName } = require('../../models/classes')
const { playerFromId } = persistence.player

function handler (bot, payload, callbackQuery) {
  const className = payload
  const chatId = callbackQuery.message.chat.id
  const playerId = callbackQuery.from.id
  const player = playerFromId(playerId)
  Promise.resolve(checkClass(className))
    .then(() => player.create(className))
    .then(() => {
      bot.sendMessage(chatId, view.message, view.keyboard)
    })
    .catch((e) => {
      console.log(e)
      bot.sendMessage(chatId, view.error)
    })
}

function checkClass (className) {
  if (!classFromName(className)) {
    throw new Error(`Class doesn't exist`)
  }
  return 'ok'
}

module.exports = {
  name: 'Create character',
  handler
}
