const emoji = require('node-emoji')
const { fromName , getAllEmoji } = require('../models/character')

const getStats = cName =>
  `Main Stats: ${fromName(cName).mainStats.join(' ').toUpperCase()}`


module.exports = {
  Mage: emoji.emojify(`
Mage description tbd

${getStats('Mage')}
  `.trim()),

  Fighter: emoji.emojify(`
Fighter description tbd

${getStats('Fighter')}
  `.trim()),

  Thief: emoji.emojify(`
Thief description tbd

${getStats('Thief')}
  `.trim()),

  Acolyte: emoji.emojify(`
Acolyte description tbd

${getStats('Acolyte')}
  `.trim()),

  Ranger: emoji.emojify(`
Ranger description tbd

${getStats('Ranger')}
  `.trim()),

  Merchant: emoji.emojify(`
Merchant description tbd

${getStats('Merchant')}
  `.trim()),

  error: `You can't do this :(`
}
