const emoji = require('node-emoji')
const recipes = require('../models/recipes')
const { getEmoji } = require('../models/gems')

const e = ':arrow_up_small:'

module.exports = {
  message: (statName) => emoji.emojify(`
:up: ${statName.toUpperCase()} increased by 2! :up:
  `.trim()),
  error: `You don't have the gems for this!`
}
