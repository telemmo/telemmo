const emoji = require('node-emoji')
const { getEmoji, getAllEmoji } = require('../models/character')

module.exports = {
  Mage: emoji.emojify(`
Mage description tbd
  `.trim()),

  Fighter: emoji.emojify(`
Fighter description tbd
  `.trim()),

  Thief: emoji.emojify(`
Thief description tbd
  `.trim()),

  Acolyte: emoji.emojify(`
Acolyte description tbd
  `.trim()),

  Ranger: emoji.emojify(`
Ranger description tbd
  `.trim()),

  Merchant: emoji.emojify(`
Merchant description tbd
  `.trim()),

  error: `You can't do this :(`
}
