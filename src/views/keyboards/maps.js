const emoji = require('node-emoji')

module.exports = {
  reply_markup: {
    keyboard: [
      [':boom: Green Fields', ':boom: Cave'],
      [':boom: Dark Swamp', ':boom: Demonic Forest'],
      [':boom: Snowy Peak', ':boom: Doom Hill'],
      ['Back to overworld :globe_with_meridians:'],
    ].map(row => row.map(el => emoji.emojify(el)))
  }
}
