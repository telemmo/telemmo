const emoji = require('node-emoji')

module.exports = {
  keyboard: {
    reply_markup: {
      keyboard: [
        ['Strength', 'Agility'],
        ['Dexterity', 'Vitality'],
        ['Inteligence', 'Luck'],
      ].map(row => row.map(key => emoji.emojify(':up: ' + key)))
    }
  },
  message: emoji.emojify(`
Choose a stat to improve
  `.trim()),
  error: `You don't have a character, create one at /start`
}
