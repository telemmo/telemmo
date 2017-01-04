const emoji = require('node-emoji')

module.exports = {
  keyboard: {
    reply_markup: {
      keyboard: [
        ['Stats :confetti_ball:', ':no_entry_sign: Skills :sunny:']
      ].map(row => row.map(key => emoji.emojify(key)))
    }
  },
  message: emoji.emojify(`
Do you want to improve Stats or Skills?
  `.trim()),
  error: `You don't have a character, create one at /start`
}
