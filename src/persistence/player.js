const Promise = require('bluebird')
const mongojs = require('mongojs')
const db = mongojs('telebot', ['players'])
const players = Promise.promisifyAll(db.players)
const { buildPlayer } = require('../models/player')

module.exports = {
  fromId
}

function fromId (telegramId) {
  return {
    create: (character) => {
      return players
        .findAsync({ telegramId })
        .then(checkExisting)
        .then(() => createPlayer(telegramId, character))
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

