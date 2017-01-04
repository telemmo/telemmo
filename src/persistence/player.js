const Promise = require('bluebird')
const mongojs = require('mongojs')
const db = mongojs(process.env.MONGO_URL, ['players'])
const players = Promise.promisifyAll(db.players)
const { buildPlayer } = require('../models/player')
const { buildCharacter } = require('../models/character')

module.exports = {
  playerFromId
}

function playerFromId (telegramId) {
  return {
    create: (first_name, className) => {
      return players
        .findAsync({ telegramId })
        .then(checkExisting)
        .then(() => createPlayer(telegramId, first_name, className))
    },
    isUnregistered: () => {
      return players
        .findAsync({ telegramId })
        .then(checkExisting)
    },
    isRegistered: () => {
      return players
        .findAsync({ telegramId })
        .then(checkNotExisting)
    },
    deleteCharacter: () => {
      return players
        .removeAsync({ telegramId })
    },
    get: () => players
      .findAsync({ telegramId })
      .then(players => players[0]),
    giveGems: (rawGems) => {
      const gems = {}
      Object.keys(rawGems)
        .forEach((key) => gems['gems.'+key] = rawGems[key])
      return players
        .updateAsync({ telegramId }, {
          $inc: gems
        })
    },
    changeStance: (stanceName) => players
      .updateAsync({ telegramId }, {
        $set: {
          'character.stance': stanceName
        }
      })
  }
}

function checkExisting (players) {
  if (players.length > 0) {
    throw new Error('Player already exists.')
  }
}

function checkNotExisting (players) {
  if (players.length === 0) {
    throw new Error('Account not created')
  }
}

function createPlayer (telegramId, first_name, className) {
  const player = buildPlayer(telegramId, first_name, buildCharacter(className, first_name))
  return db.players.insertAsync(player)
}

