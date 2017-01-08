const emoji = require('node-emoji')

module.exports = {
  message: (statName, amount) => emoji.emojify(`
:up: ${statName.toUpperCase()} increased by ${amount}! :up:
  `.trim()),
  error: `You don't have the gems for this!`
}
