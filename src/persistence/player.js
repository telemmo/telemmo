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
      }),
    improve: (statName, amount) => {
      const statRecipes = require('../models/recipes').stats[amount]
      return players.findAsync({ telegramId })
        .then(players => players[0])
        .then(playerHard => {
          statRecipes.forEach(gem => {
            if (playerHard.gems[gem.name] < gem.amount) {
              throw new Error('Not enough gems')
            }
          })
          return statRecipes.reduce((acc, el) =>
            Object.assign({}, acc, {
              ['gems.' + el.name]: -el.amount
            }),
            {}
          )
        })
        .then((gemsRemoved) => {
          players.updateAsync({ telegramId }, {
            $inc: Object.assign({},
              { ['character.' + statName]: amount },
              gemsRemoved
            )
          })
        })
    }
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

