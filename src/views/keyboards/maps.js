const emoji = require('node-emoji')

module.exports = {
  reply_markup: {
    keyboard: [
      [':boom: Green Fields', ':no_entry_sign: Cave'],
      [':no_entry_sign: Old Factory', ':no_entry_sign: Spooky Lands'],
      ['Back to overworld :globe_with_meridians:'],
    ].map(row => row.map(el => emoji.emojify(el)))
  }
}
