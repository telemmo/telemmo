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
    create: (username, className) => {
      return players
        .findAsync({ telegramId })
        .then(checkExisting)
        .then(() => createPlayer(telegramId, username, className))
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

function createPlayer (telegramId, username, className) {
  const player = buildPlayer(telegramId, username, buildCharacter(className))
  return db.players.insertAsync(player)
}

