const emoji = require('node-emoji')

module.exports = {
  buildGems,
  getEmoji
}

const gems = [
  'Rock',
  'Earth',
  'Water',
  'Ice',
  'Wind',
  'Shock',
  'Fire',
  'Metal',
]

const emojis = {
  'Rock': ':moyai:',
  'Earth': ':mushroom:',
  'Water': ':droplet:',
  'Ice': ':snowflake:',
  'Wind': ':leaves:',
  'Shock': ':zap:',
  'Fire': ':fire:',
  'Metal': ':gear:',
}

function getEmoji (name) {
  return emojis[name]
}

function buildGems () {
  return gems.reduce(
    (acc, gem) => Object.assign({}, acc, { [gem]: 0 }),
    {}
  )
}

