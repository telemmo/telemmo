const view = require('../../views/character-created')
const persistence = require('../../persistence')
const { classFromName } = require('../../models/classes')
const { playerFromId } = persistence.player

function handler (bot, dataPayload, payload) {
  const className = dataPayload
  const chatId = payload.message.chat.id
  const playerId = payload.from.id
  const username = payload.from.username
  const player = playerFromId(playerId)
  Promise.resolve(checkClass(className))
    .then(() => player.create(username, className))
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
