const Promise = require('bluebird')
const mongojs = require('mongojs')
const db = mongojs('telebot', ['players'])
const players = Promise.promisifyAll(db.players)

module.exports = {
  fromId
}

function fromId (telegramId) {
  return {
    create: () => {
      return players
        .findAsync({ telegramId })
        .then(checkExisting)
        .then(() => createPlayer(telegramId))
    },
    isUnregistered: () => {
      return players
        .findAsync({ telegramId })
        .then(checkExisting)
    },
  }
}

function checkExisting (players) {
  if (players.length > 0) {
    throw new Error('Player already exists.')
  }
}

function createPlayer (telegramId) {
  const player = buildPlayer(telegramId)
  return db.players.insertAsync(player)
}

