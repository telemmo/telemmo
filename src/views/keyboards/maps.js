const emoji = require('node-emoji')

module.exports = {
  reply_markup: {
    keyboard: [
      [':boom: Green Fields', ':boom: Cave'],
      [':boom: Dark Swamp', ':boom: Demonic Forest'],
      [':boom: Snowy Peak', ':boom: Volcanic Oasis'],
      [':boom: Robot City', ':boom: Deeps Below'],
      [':boom: Dragonic Sanctuary', ':boom: Doom Hill'],
    ].map(row => row.map(el => emoji.emojify(el)))
  }
}
