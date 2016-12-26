const Promise = require('bluebird')
const mongojs = require('mongojs')
const db = mongojs('telebot', ['players'])
const players = Promise.promisifyAll(db.players)
const { buildPlayer } = require('../models/player')
const { buildCharacter } = require('../models/character')

module.exports = {
  playerFromId
}

function playerFromId (telegramId) {
  return {
    create: (className) => {
      return players
        .findAsync({ telegramId })
        .then(checkExisting)
        .then(() => createPlayer(telegramId, className))
        .then(console.log)
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

function createPlayer (telegramId, className) {
  const player = buildPlayer(telegramId, buildCharacter(className))
  return db.players.insertAsync(player)
}

