const emoji = require('node-emoji')
const { getAllEmoji } = require('../models/classes')

module.exports = {
  keyboard: {
    reply_markup: {
      keyboard: [
        ['Easy Fields'],
        [':no_entry_sign: Generic Desert'],
        [':no_entry_sign: Old Town'],
        [':no_entry_sign: Wild Place'],
      ].map(row => row.map(el => emoji.emojify(el)))
    }
  },
  message: emoji.emojify(`
:earth_asia:' Explore :earth_asia:

Choose a map to explore:

`.trim()),
  error: `You can't do this :(`
}
