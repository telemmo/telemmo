const emoji = require('node-emoji')
const keyboard = require('./keyboards/overworld')

module.exports = {
  keyboard,
  message: emoji.emojify(`
Character created! Have fun!
  `.trim()),
  error: 'You already have a character :)'
}
