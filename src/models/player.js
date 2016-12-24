const { buildGems } = require('./gems')

module.exports = {
  buildPlayer
}

function buildPlayer (telegramId, character) {
  return Object.assign({},
    buildGems(),
    {
      telegramId,
      character,
    }
  )
}

