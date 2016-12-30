const emoji = require('node-emoji')
const { classFromName } = require('../models/classes')
const { stanceFromName } = require('../models/stances')

module.exports = {
  keyboard: (className) => ({
    reply_markup: {
      keyboard: [
        ['Refresh Energy'],
        classFromName(className).stances
          .map(stance => emoji.emojify(
            'Stance: ' + stance + ' ' + stanceFromName(stance).emoji)
          )
      ]
    }
  }),
  message: (map) => emoji.emojify(`
You started exploring ${map}!

You have 60 minutes of energy. Refreshing energy is free.

Good Luck!
  `.trim()),
  error: `You don't have a character, create one at /start`
}
