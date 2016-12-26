const emoji = require('node-emoji')

module.exports = {
  keyboard:{
    reply_markup: {
      keyboard: [
        ['Explore Map :earth_asia:'],
        ['Alchemy :cyclone:', 'Dungeons :key:'],
        ['Market :european_post_office:', 'My Stats :part_alternation_mark:'],
      ].map(row => row.map(el => emoji.emojify(el)))
    },
  },
  message: emoji.emojify(`
Character created! Have fun!
  `.trim()),
  error: 'You already have a character :)'
}
