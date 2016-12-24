const emoji = require('node-emoji')
const { getEmoji } = require('../models/character')

module.exports = {
  keyboard:{
    reply_markup: {
      keyboard: [
        ['Mage', 'Fighter', 'Thief'],
        ['Acolyte', 'Ranger', 'Merchant' ],
      ].map(row => row.map(className =>
        emoji.emojify(
          `:question: ${className} ${getEmoji(className)}`
        )
      ))
    },
  },
  message: emoji.emojify(`
:earth_americas: Welcome to telemmo! :earth_americas:

Please, choose a class in your keyboard menu to see info about it.
  `.trim()),
  error: 'You already have a character :)'
}
