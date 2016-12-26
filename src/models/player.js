const { buildGems } = require('./gems')

module.exports = {
  buildPlayer
}

function buildPlayer (telegramId, character) {
  return Object.assign({},
    { gems: buildGems() },
    {
      telegramId,
      character,
    }
  )
}

