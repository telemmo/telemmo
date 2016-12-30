const emoji = require('node-emoji')
const { classFromName } = require('../models/classes')
const { stanceFromName } = require('../models/stances')

module.exports = {
  keyboard: (className) => ({
    reply_markup: {
      keyboard: [
        ['Refresh Energy'],
        classFromName(className).stances
          .map(stance =>
            'Stance: ' + stance + ' ' + stanceFromName(stance).emoji
          ),
        ['Back to overworld :globe_with_meridians:', 'Explore Map :earth_asia:'],
      ].map(row => row.map(el => emoji.emojify(el)))
    }
  }),
  message: (map) => emoji.emojify(`
You started exploring ${map}!

You have 60 minutes of energy. Refreshing energy is free.

Good Luck!
  `.trim()),
  error: `You don't have a character, create one at /start`
}
