const emoji = require('node-emoji')
const { classFromName } = require('../../models/classes')

module.exports = {
  reply_markup: {
    keyboard: [
      ['Mage', 'Fighter'],
      ['Thief', 'Acolyte'],
      ['Ranger', 'Merchant'],
    ].map(row => row.map(className =>
      emoji.emojify(
        `:question: ${className} ${classFromName(className).classEmoji}`
      )
    ))
  },
}
