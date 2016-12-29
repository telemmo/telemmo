const emoji = require('node-emoji')

module.exports = {
  reply_markup: {
    keyboard: [
      ['Easy Fields', ':no_entry_sign: Wild Place'],
      [':no_entry_sign: Generic Desert', ':no_entry_sign: Old Town'],
      ['Back to overworld :globe_with_meridians:'],
    ].map(row => row.map(el => emoji.emojify(el)))
  }
}
