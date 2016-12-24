const emoji = require('node-emoji')
const { getEmoji, getAllEmoji } = require('../models/character')

module.exports = {
  keyboard:{
    reply_markup: {
      keyboard: [
        ['Mage', 'Fighter'],
        ['Thief', 'Acolyte'],
        ['Ranger', 'Merchant'],
      ].map(row => row.map(className =>
        emoji.emojify(
          `:question: ${className} ${getEmoji(className)}`
        )
      ))
    },
  },
  message: emoji.emojify(`
:globe_with_meridians: Welcome to TeleMMO! :globe_with_meridians:

Explore the starter classes in your keyboard menu.

${getAllEmoji()}
  `.trim()),
  error: 'You already have a character :)'
}
