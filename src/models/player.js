const { buildGems } = require('./gems')

module.exports = {
  buildPlayer
}

function buildPlayer (telegramId, username, character) {
  return Object.assign({},
    { gems: buildGems() },
    {
      telegramId,
      username,
      character,
    }
  )
}

