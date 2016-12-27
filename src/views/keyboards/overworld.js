const emoji = require('node-emoji')

module.exports = {
  reply_markup: {
    keyboard: [
      ['Explore Map :earth_asia:'],
      [':no_entry_sign: Alchemy :cyclone:', ':no_entry_sign: Dungeons :key:'],
      [':no_entry_sign: Market :european_post_office:', ':no_entry_sign: My Stats :part_alternation_mark:'],
    ].map(row => row.map(el => emoji.emojify(el)))
  },
}
