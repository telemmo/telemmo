const { buildGems } = require('./gems')

module.exports = {
  buildPlayer
}

function buildPlayer (telegramId, first_name, character) {
  return Object.assign({},
    { gems: buildGems() },
    {
      telegramId,
      first_name,
      character,
    }
  )
}

