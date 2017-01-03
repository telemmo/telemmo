const emoji = require('node-emoji')
const keyboard = require('./keyboards/classInfo')
const errorView = require('./overworld')
const { getAllEmoji } = require('../models/classes')

module.exports = {
  keyboard,
  message: emoji.emojify(`
:globe_with_meridians: Welcome to TeleMMO! :globe_with_meridians:

Explore the starter classes in your keyboard menu.

${getAllEmoji()}
  `.trim()),
  error: errorView.message,
  errorKeyboard: errorView.keyboard,
}
