const emoji = require('node-emoji')
const keyboard = require('./keyboards/maps')
const { getAllEmoji } = require('../models/classes')

module.exports = {
  keyboard,
  message: emoji.emojify(`
:earth_asia:' Explore :earth_asia:

Choose a map to explore:

`.trim()),
  error: `You don't have a character, create one at /start`
}
